import puppeteer from 'puppeteer';
import fs from 'fs';

const DATASET_ID = '19ae8295-9dab-4277-963a-f9c7aab23f78';
const DATASET_NAME = 'Daily Sales Master 2';
const USER_DATA = '/tmp/chrome-pdp-profile';

async function setupProfile() {
  const { execSync } = await import('child_process');
  const src = '/home/ubuntu/.config/google-chrome/Default/Cookies';
  execSync(`rm -rf ${USER_DATA} && mkdir -p ${USER_DATA}/Default`);
  try {
    execSync(`cp "${src}" ${USER_DATA}/Default/`);
    execSync(`cp /home/ubuntu/.config/google-chrome/Local\\ State ${USER_DATA}/ 2>/dev/null || true`);
  } catch (e) {
    console.error('No cookies to copy:', e.message);
  }
}

async function apiFetch(page, endpoint) {
  return page.evaluate(async (ep) => {
    try {
      const r = await fetch(ep, { credentials: 'include', headers: { Accept: 'application/json' } });
      const text = await r.text();
      try { return { status: r.status, url: ep, data: JSON.parse(text) }; }
      catch { return { status: r.status, url: ep, text: text.slice(0, 3000) }; }
    } catch (e) { return { error: e.message, url: ep }; }
  }, endpoint);
}

async function main() {
  await setupProfile();
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: USER_DATA,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1920, height: 1200 },
  });
  const page = await browser.newPage();

  const endpoints = [
    `/api/data/v3/datasources/${DATASET_ID}`,
    `/api/data/v1/datasources/${DATASET_ID}`,
    `/api/content/v1/datasources/${DATASET_ID}`,
    `/api/data/v3/datasources/${DATASET_ID}/policies`,
    `/api/data/v1/datasources/${DATASET_ID}/policies`,
    `/api/governance/v1/datasets/${DATASET_ID}/policies`,
    `/api/governance/v1/pdp/policies?dataSourceId=${DATASET_ID}`,
    `/api/authorization/v1/datasources/${DATASET_ID}/policies`,
    `/api/authorization/v1/policies?dataSourceId=${DATASET_ID}`,
    `/api/dataprocessing/v1/datasources/${DATASET_ID}/policies`,
    `/api/identity/v2/groups?limit=200`,
    `/api/identity/v1/users?limit=5`,
  ];

  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });
  const home = await page.evaluate(() => ({ title: document.title, url: location.href, text: document.body?.innerText?.slice(0, 500) }));

  const results = { datasetId: DATASET_ID, datasetName: DATASET_NAME, home, api: {} };
  for (const ep of endpoints) {
    results.api[ep] = await apiFetch(page, ep);
  }

  // Try dataset page and PDP UI scrape
  const pdpUrls = [
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/overview`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/pdp`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/pdp`,
    `https://regiscorp.domo.com/datacenter/datasources/${DATASET_ID}`,
    `https://regiscorp.domo.com/page/data-catalog/data-source/${DATASET_ID}`,
  ];

  results.pages = [];
  for (const url of pdpUrls) {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 4000));
    results.pages.push({
      url: page.url(),
      title: await page.title(),
      body: await page.evaluate(() => document.body?.innerText?.slice(0, 25000)),
    });
    if (page.url().includes('pdp') || (results.pages.at(-1).body || '').toLowerCase().includes('policy')) {
      await page.screenshot({ path: '/workspace/assets/daily-sales-master-2-pdp.png', fullPage: false });
    }
  }

  await browser.close();
  fs.writeFileSync('/tmp/pdp-dsm2.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ ok: true, loggedIn: !home.text?.match(/sign.?in/i), file: '/tmp/pdp-dsm2.json' }));
}

main().catch((e) => { console.error(e); process.exit(1); });
