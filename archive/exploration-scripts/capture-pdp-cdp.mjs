import puppeteer from 'puppeteer';
import fs from 'fs';

const DATASET_ID = '19ae8295-9dab-4277-963a-f9c7aab23f78';

async function connectBrowser() {
  for (const port of [9222, 9223, 9333]) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (!res.ok) continue;
      const { webSocketDebuggerUrl } = await res.json();
      return puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl, defaultViewport: null });
    } catch {
      /* try next port */
    }
  }
  return null;
}

async function launchWithProfile() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-pdp-capture';
  execSync(`rm -rf ${USER_DATA} && mkdir -p ${USER_DATA}/Default`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Default/Cookies ${USER_DATA}/Default/`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Local\\ State ${USER_DATA}/ 2>/dev/null || true`);
  return puppeteer.launch({
    headless: 'new',
    userDataDir: USER_DATA,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1920, height: 1200 },
  });
}

async function scrape(page) {
  return page.evaluate(() => ({
    url: location.href,
    title: document.title,
    body: document.body?.innerText?.slice(0, 80000),
  }));
}

async function apiFetch(page, endpoint) {
  return page.evaluate(async (ep) => {
    try {
      const r = await fetch(ep, { credentials: 'include', headers: { Accept: 'application/json' } });
      const text = await r.text();
      try {
        return { status: r.status, data: JSON.parse(text) };
      } catch {
        return { status: r.status, text: text.slice(0, 12000) };
      }
    } catch (e) {
      return { error: e.message };
    }
  }, endpoint);
}

async function main() {
  let browser = await connectBrowser();
  let connected = !!browser;
  if (!browser) browser = await launchWithProfile();

  const results = { connected, api: {}, network: [], pages: [] };
  const page = connected
    ? (await browser.pages()).find((p) => p.url().includes('regiscorp.domo.com')) || (await browser.newPage())
    : await browser.newPage();

  page.on('response', async (res) => {
    const url = res.url();
    if (!/regiscorp\.domo\.com\/api\//i.test(url)) return;
    if (!/polic|pdp|govern|permission|rls|rowlevel|personal/i.test(url)) return;
    try {
      const ct = res.headers()['content-type'] || '';
      const entry = { url, status: res.status(), ct };
      if (ct.includes('json')) {
        const text = await res.text();
        try {
          entry.data = JSON.parse(text);
        } catch {
          entry.text = text.slice(0, 8000);
        }
      }
      results.network.push(entry);
    } catch {
      /* ignore */
    }
  });

  if (!connected) {
    await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });
  }

  const endpoints = [
    `/api/governance/v1/policies?dataSourceId=${DATASET_ID}`,
    `/api/governance/v2/policies?dataSourceId=${DATASET_ID}`,
    `/api/governance/v1/datasets/${DATASET_ID}/policies`,
    `/api/governance/v2/datasets/${DATASET_ID}/policies`,
    `/api/authorization/v2/policies?resourceId=${DATASET_ID}`,
    `/api/authorization/v1/policies?dataSourceId=${DATASET_ID}`,
    `/api/content/v1/data/datasets/${DATASET_ID}/policies`,
    `/api/datacenter/v1/datasources/${DATASET_ID}/policies`,
    `/api/data/v3/datasources/${DATASET_ID}/rowLevelSecurity`,
    `/api/data/v3/datasources/${DATASET_ID}/permissions`,
    `/api/data/v3/datasources/${DATASET_ID}/sharing`,
    `/api/identity/v2/groups?limit=500`,
    `/api/governance/v1/attributes?limit=200`,
  ];
  for (const ep of endpoints) results.api[ep] = await apiFetch(page, ep);

  const overview = `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/overview`;
  await page.goto(overview, { waitUntil: 'networkidle2', timeout: 120000 });
  await new Promise((r) => setTimeout(r, 4000));
  results.pages.push({ step: 'overview', ...(await scrape(page)) });
  await page.screenshot({ path: '/workspace/assets/daily-sales-master-pdp-overview.png' });

  // Open MORE menu and click PDP-related items
  await page.evaluate(() => {
    const more = [...document.querySelectorAll('button,a,span,div')]
      .find((el) => /^MORE$/i.test((el.textContent || '').trim()));
    if (more) more.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const menuClick = await page.evaluate(() => {
    const items = [...document.querySelectorAll('a,button,li,span,div')];
    const pdp = items.find((el) => /personalized|pdp|data permission|row level|policies/i.test(el.textContent || ''));
    if (pdp) {
      pdp.click();
      return pdp.textContent?.trim();
    }
    return null;
  });
  results.menuClick = menuClick;
  await new Promise((r) => setTimeout(r, 6000));
  results.pages.push({ step: 'after-more-menu', ...(await scrape(page)) });
  await page.screenshot({ path: '/workspace/assets/daily-sales-master-pdp-policies.png', fullPage: true });

  // Try direct governance URL patterns
  const directUrls = [
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/personalized-data-permissions`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/row-level-security`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/sharing`,
    `https://regiscorp.domo.com/admin/governance/personalized-data-permissions`,
    `https://regiscorp.domo.com/page/datacenter/pdp/${DATASET_ID}`,
  ];
  for (const url of directUrls) {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 5000));
    const data = await scrape(page);
    results.pages.push({ step: url, ...data });
    if (/polic|personalized|group|filter|franchisee/i.test(data.body || '')) {
      await page.screenshot({ path: `/workspace/assets/pdp-${results.pages.length}.png`, fullPage: true });
    }
  }

  if (connected) await browser.disconnect();
  else await browser.close();

  fs.writeFileSync('/tmp/pdp-capture-final.json', JSON.stringify(results, null, 2));
  const policyHits = results.network.filter((n) => n.data);
  console.log(
    JSON.stringify({
      connected,
      networkHits: results.network.length,
      policyApiHits: Object.entries(results.api).filter(([, v]) => v.status === 200).map(([k]) => k),
      menuClick,
      lastUrl: results.pages.at(-1)?.url,
      bodyPreview: results.pages.at(-1)?.body?.slice(0, 400),
    }),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
