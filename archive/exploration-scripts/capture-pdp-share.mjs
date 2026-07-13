import puppeteer from 'puppeteer';
import fs from 'fs';

const DATASET_ID = '19ae8295-9dab-4277-963a-f9c7aab23f78';

async function setup() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-pdp-capture2';
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
  const userDataDir = await setup();
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1920, height: 1200 },
  });
  const page = await browser.newPage();
  const results = { api: {}, ui: {} };

  page.on('response', async (res) => {
    const url = res.url();
    if (!/regiscorp\.domo\.com\/api\//i.test(url)) return;
    if (!/pdp|polic|govern|security|rls|personal|filter/i.test(url)) return;
    try {
      const ct = res.headers()['content-type'] || '';
      if (!ct.includes('json')) return;
      const data = JSON.parse(await res.text());
      results.api[url] = { status: res.status(), data };
    } catch {
      /* ignore */
    }
  });

  await page.goto(`https://regiscorp.domo.com/datasources/${DATASET_ID}/details/overview`, {
    waitUntil: 'networkidle2',
    timeout: 120000,
  });
  await new Promise((r) => setTimeout(r, 4000));

  // Click Share this dataset
  await page.evaluate(() => {
    const el = [...document.querySelectorAll('a,button,span,div')]
      .find((n) => /share this dataset/i.test(n.textContent || ''));
    if (el) el.click();
  });
  await new Promise((r) => setTimeout(r, 4000));
  results.ui.shareModal = await page.evaluate(() => document.body.innerText.slice(0, 20000));
  await page.screenshot({ path: '/workspace/assets/daily-sales-master-share-modal.png' });

  // Look for PDP tab in share modal
  await page.evaluate(() => {
    const tab = [...document.querySelectorAll('a,button,span,div,li')]
      .find((n) => /personalized|pdp|data permission|row level/i.test(n.textContent || ''));
    if (tab) tab.click();
  });
  await new Promise((r) => setTimeout(r, 5000));
  results.ui.pdpInShare = await page.evaluate(() => document.body.innerText.slice(0, 40000));
  await page.screenshot({ path: '/workspace/assets/daily-sales-master-pdp-share-tab.png', fullPage: true });

  // Brute-force API paths
  const paths = [
    `/api/governance/v1/pdp/policies?dataSourceId=${DATASET_ID}`,
    `/api/governance/v1/pdp/policies?datasetId=${DATASET_ID}`,
    `/api/governance/v1/pdp?dataSourceId=${DATASET_ID}`,
    `/api/governance/v1/securityPolicies?dataSourceId=${DATASET_ID}`,
    `/api/governance/v1/securityPolicies?resourceId=${DATASET_ID}`,
    `/api/governance/v2/securityPolicies?resourceId=${DATASET_ID}`,
    `/api/governance/v1/datasets/${DATASET_ID}/securityPolicies`,
    `/api/governance/v1/datasets/${DATASET_ID}/pdp`,
    `/api/governance/v1/datasets/${DATASET_ID}/pdpPolicies`,
    `/api/data/v3/datasources/${DATASET_ID}/securityPolicies`,
    `/api/data/v3/datasources/${DATASET_ID}/pdpPolicies`,
    `/api/data/v3/datasources/${DATASET_ID}/filters`,
    `/api/dataprocessing/v1/pdp/policies?dataSourceId=${DATASET_ID}`,
    `/api/authorization/v1/pdp/policies?dataSourceId=${DATASET_ID}`,
    `/api/authorization/v2/pdp/policies?dataSourceId=${DATASET_ID}`,
    `/api/authorization/v1/securityPolicies?dataSourceId=${DATASET_ID}`,
    `/api/content/v1/pdp/policies?dataSourceId=${DATASET_ID}`,
    `/api/content/v1/securityPolicies?dataSourceId=${DATASET_ID}`,
    `/api/governance/v1/policies`,
    `/api/governance/v2/policies`,
  ];
  for (const p of paths) results.api[p] = await api(page, p);

  await browser.close();
  fs.writeFileSync('/tmp/pdp-api-brute.json', JSON.stringify(results, null, 2));

  const hits = Object.entries(results.api).filter(([, v]) => v.status === 200 && v.data);
  console.log(
    JSON.stringify({
      hits: hits.map(([k, v]) => ({
        path: k,
        preview: JSON.stringify(v.data).slice(0, 300),
      })),
      sharePreview: results.ui.shareModal?.slice(0, 500),
      pdpPreview: results.ui.pdpInShare?.slice(0, 800),
    }),
  );
}

main();
