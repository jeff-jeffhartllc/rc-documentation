import puppeteer from 'puppeteer';
import fs from 'fs';
import { execSync } from 'child_process';

const USER_DATA = '/tmp/chrome-pdp-live2';

function setupProfile() {
  execSync(`rm -rf ${USER_DATA} && mkdir -p ${USER_DATA}/Default`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Default/Cookies ${USER_DATA}/Default/`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Local\\ State ${USER_DATA}/ 2>/dev/null || true`);
}

async function api(page, ep) {
  return page.evaluate(async (e) => {
    const r = await fetch(e, { credentials: 'include', headers: { Accept: 'application/json' } });
    const t = await r.text();
    try { return { status: r.status, data: JSON.parse(t) }; } catch { return { status: r.status, text: t.slice(0, 2000) }; }
  }, ep);
}

async function main() {
  setupProfile();
  const browser = await puppeteer.launch({ headless: 'new', userDataDir: USER_DATA, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });

  const results = { datasets: [], policyAttempts: [] };

  // search datasets
  for (const q of ['Daily Sales Master 2', 'Daily Sales Master', 'Store Scorecard Data', 'DimSalon']) {
    const res = await api(page, `/api/data/v3/datasources/search?query=${encodeURIComponent(q)}&limit=20`);
    results.datasets.push({ q, res });
  }

  // list recent datasets
  for (let offset = 0; offset < 100; offset += 50) {
    const res = await api(page, `/api/data/v3/datasources?limit=50&offset=${offset}&sort=name`);
    const arr = res?.data?.data || res?.data;
    if (!Array.isArray(arr) || !arr.length) break;
    for (const ds of arr) {
      if (/daily sales master|scorecard|dimsalon/i.test(ds.name || '')) {
        results.datasets.push({ listed: ds.name, id: ds.id });
      }
    }
  }

  const targets = [];
  for (const item of results.datasets) {
    const arr = item.res?.data?.data || item.res?.data?.results || [];
    if (Array.isArray(arr)) {
      for (const ds of arr) targets.push({ name: ds.name, id: ds.id });
    }
    if (item.listed) targets.push({ name: item.listed, id: item.id });
  }

  const unique = [...new Map(targets.map((t) => [t.id, t])).values()];
  results.targets = unique;

  const policyPaths = (id) => [
    `/api/content/v1/data/datasets/${id}/policies`,
    `/api/content/v1/datasources/${id}/policies`,
    `/api/governance/v1/datasets/${id}/policies`,
    `/api/governance/v1/pdp/policies?datasetId=${id}`,
    `/api/authorization/v1/datasets/${id}/policies`,
    `/api/dataprocessing/v1/datasources/${id}/policies`,
    `/api/data/v3/datasources/${id}/personalizedDataPermissions`,
    `/api/data/v3/datasources/${id}/pdp`,
  ];

  for (const t of unique) {
    const attempts = { dataset: t, endpoints: {} };
    for (const ep of policyPaths(t.id)) {
      attempts.endpoints[ep] = await api(page, ep);
    }
    results.policyAttempts.push(attempts);
  }

  await browser.close();
  fs.writeFileSync('/tmp/pdp-search.json', JSON.stringify(results, null, 2));
  console.log('targets', unique.map((t) => `${t.name} (${t.id})`).join('; '));
}

main();
