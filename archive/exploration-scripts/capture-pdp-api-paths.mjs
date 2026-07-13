import puppeteer from 'puppeteer';
import fs from 'fs';

const DATASET_ID = '19ae8295-9dab-4277-963a-f9c7aab23f78';

async function setup() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-pdp-api';
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
      return { status: r.status, text: t.slice(0, 2000) };
    }
  }, ep);
}

async function main() {
  const userDataDir = await setup();
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });

  const paths = [
    `/api/data/v1/datasources/${DATASET_ID}`,
    `/api/data/v1/datasources/${DATASET_ID}/policies`,
    `/api/data/v1/datasets/${DATASET_ID}`,
    `/api/data/v1/datasets/${DATASET_ID}/policies`,
    `/api/content/v1/datasets/${DATASET_ID}`,
    `/api/content/v1/datasets/${DATASET_ID}/policies`,
    `/api/content/v1/data/datasets/${DATASET_ID}`,
    `/api/content/v1/data/datasets/${DATASET_ID}/policies`,
    `/api/dataprocessing/v1/datasources/${DATASET_ID}`,
    `/api/dataprocessing/v1/datasources/${DATASET_ID}/policies`,
    `/api/developer/v1/datasets/${DATASET_ID}`,
    `/api/developer/v1/datasets/${DATASET_ID}/policies`,
    `/api/domoweb/v1/datasets/${DATASET_ID}/policies`,
    `/api/domoweb/v1/datasources/${DATASET_ID}/policies`,
    `/api/governance/v1/datasets/${DATASET_ID}`,
    `/api/governance/v1/datasets/${DATASET_ID}/policies`,
    `/api/governance/v1/pdp/policies?datasetId=${DATASET_ID}`,
    `/api/governance/v1/pdp/policies?dataSourceId=${DATASET_ID}`,
    `/api/governance/v1/pdp/datasets/${DATASET_ID}/policies`,
    `/api/identity/v2/groups/82766453`,
    `/api/identity/v2/groups/2014419418`,
    `/api/identity/v2/groups/1547677730`,
    `/api/identity/v2/groups/950576281`,
  ];

  const results = {};
  for (const p of paths) results[p] = await api(page, p);
  await browser.close();
  fs.writeFileSync('/tmp/pdp-api-paths.json', JSON.stringify(results, null, 2));

  for (const [p, v] of Object.entries(results)) {
    if (v.status === 200) {
      const s = JSON.stringify(v.data).slice(0, 400);
      console.log('HIT', p, s);
      if (v.data?.policies) console.log('POLICIES', JSON.stringify(v.data.policies).slice(0, 2000));
      if (Array.isArray(v.data) && v.data[0]?.filters) console.log('POLICY ARRAY', JSON.stringify(v.data).slice(0, 2000));
    }
  }
}

main();
