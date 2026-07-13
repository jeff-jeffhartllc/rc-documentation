import puppeteer from 'puppeteer';
import fs from 'fs';

const DATASET_ID = '0239c170-55d5-43e1-9a92-a3498ba68548';
const ASSET = '/workspace/assets/daily-sales-indexed-by-store-2-pdp-policies.png';

async function setup() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-pdp-capture-one';
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
      return { status: r.status, text: t.slice(0, 4000) };
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
  const filterOpts =
    'load_associations,include_open_policy,load_filters,sort&paginate=true&&limit=50&offset=0';

  await page.goto(`https://regiscorp.domo.com/datasources/${DATASET_ID}/details/rls`, {
    waitUntil: 'networkidle2',
    timeout: 120000,
  });
  await new Promise((r) => setTimeout(r, 6000));

  const results = {
    id: DATASET_ID,
    body: await page.evaluate(() => document.body.innerText.slice(0, 50000)),
    rowPolicies: await api(
      page,
      `/api/query/v1/data-control/${DATASET_ID}/filter-groups?options=${filterOpts}`,
    ),
    meta: await api(page, `/api/data/v3/datasources/${DATASET_ID}`),
  };

  await page.screenshot({ path: ASSET, fullPage: true });
  await browser.close();
  fs.writeFileSync('/tmp/pdp-capture-one.json', JSON.stringify(results, null, 2));

  const m = results.meta?.data || {};
  console.log(
    JSON.stringify({
      name: m.name,
      id: DATASET_ID,
      owner: m.owner?.name,
      rowCount: m.rowCount,
      columnCount: m.columnCount,
      tags: m.tags,
      policies: results.rowPolicies?.data,
      body: results.body?.slice(
        results.body.indexOf('Row policies'),
        results.body.indexOf('Row policies') + 2000,
      ),
    }),
  );
}

main();
