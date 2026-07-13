import puppeteer from 'puppeteer';
import fs from 'fs';

const DSM2_ID = '8d851507-f995-4918-abc8-90032b2eff65';
const DSM_ID = '19ae8295-9dab-4277-963a-f9c7aab23f78';

async function setup() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-pdp-final';
  execSync(`rm -rf ${USER_DATA} && mkdir -p ${USER_DATA}/Default`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Default/Cookies ${USER_DATA}/Default/`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Local\\ State ${USER_DATA}/ 2>/dev/null || true`);
  return USER_DATA;
}

async function api(page, ep) {
  return page.evaluate(async (e) => {
    const r = await fetch(e, { credentials: 'include', headers: { Accept: 'application/json' } });
    const t = await r.text();
    try {
      return { status: r.status, data: JSON.parse(t) };
    } catch {
      return { status: r.status, text: t.slice(0, 8000) };
    }
  }, ep);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: await setup(),
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1920, height: 1200 },
  });
  const page = await browser.newPage();
  const results = { datasets: {}, api: {} };

  page.on('response', async (res) => {
    const url = res.url();
    if (!/regiscorp\.domo\.com\/api\//i.test(url)) return;
    if (!/rls|polic|pdp|govern|security|permission/i.test(url)) return;
    try {
      const ct = res.headers()['content-type'] || '';
      if (!ct.includes('json')) return;
      results.api[url] = { status: res.status(), data: JSON.parse(await res.text()) };
    } catch {
      /* ignore */
    }
  });

  await page.goto(`https://regiscorp.domo.com/datasources/${DSM2_ID}/details/rls`, {
    waitUntil: 'networkidle2',
    timeout: 120000,
  });
  await new Promise((r) => setTimeout(r, 6000));
  results.datasets.dsm2 = {
    url: page.url(),
    body: await page.evaluate(() => document.body.innerText.slice(0, 50000)),
  };
  await page.screenshot({ path: '/workspace/assets/daily-sales-master-2-pdp-policies.png', fullPage: true });

  const endpoints = (id) => [
    `/api/data/v3/datasources/${id}`,
    `/api/data/v3/datasources/${id}/policies`,
    `/api/data/v3/datasources/${id}/permissions`,
    `/api/data/v3/datasources/${id}/rls`,
    `/api/data/v3/datasources/${id}/rowLevelSecurity`,
    `/api/governance/v1/policies?dataSourceId=${id}`,
    `/api/governance/v2/policies?dataSourceId=${id}`,
  ];

  for (const id of [DSM2_ID, DSM_ID]) {
    results.api[id] = {};
    for (const ep of endpoints(id)) results.api[id][ep] = await api(page, ep);
  }

  await browser.close();
  fs.writeFileSync('/tmp/pdp-dsm2-final.json', JSON.stringify(results, null, 2));

  const dsm2pol =
    results.api[DSM2_ID]?.[`/api/data/v3/datasources/${DSM2_ID}/policies`] ||
    results.api[DSM2_ID]?.[`/api/data/v3/datasources/${DSM2_ID}/rls`];
  console.log(JSON.stringify({ dsm2pol: dsm2pol?.data, bodyPreview: results.datasets.dsm2.body?.slice(0, 1000) }));
}

main();
