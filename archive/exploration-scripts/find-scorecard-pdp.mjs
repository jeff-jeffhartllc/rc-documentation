import puppeteer from 'puppeteer';
import fs from 'fs';

async function setup() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-find-ds';
  execSync(`rm -rf ${USER_DATA} && mkdir -p ${USER_DATA}/Default`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Default/Cookies ${USER_DATA}/Default/`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Local\\ State ${USER_DATA}/ 2>/dev/null || true`);
  return USER_DATA;
}

async function api(page, ep) {
  return page.evaluate(async (e) => {
    const r = await fetch(e, { credentials: 'include', headers: { Accept: 'application/json' } });
    const t = await r.text();
    try { return { status: r.status, data: JSON.parse(t) }; }
    catch { return { status: r.status, text: t.slice(0, 1000) }; }
  }, ep);
}

async function main() {
  const browser = await puppeteer.launch({ headless: 'new', userDataDir: await setup(), args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });

  const names = ['Store Scorecard Data', 'Store Scorecard Data_Brand Peers', 'Daily Sales Indexed by Store 2', 'DimSalon'];
  const found = [];
  for (let offset = 0; offset < 500; offset += 100) {
    const res = await api(page, `/api/data/v3/datasources?limit=100&offset=${offset}&sort=name`);
    const arr = res?.data?.data;
    if (!Array.isArray(arr) || !arr.length) break;
    for (const ds of arr) {
      if (names.some((n) => ds.name === n || ds.name?.includes(n.split(' ')[0]))) {
        if (names.some((n) => ds.name === n)) found.push({ id: ds.id, name: ds.name, tags: ds.tags });
      }
    }
  }

  const filterOpts = 'load_associations,include_open_policy,load_filters,sort&paginate=true&&limit=50&offset=0';
  const policies = {};
  for (const ds of found) {
    policies[ds.id] = await api(page, `/api/query/v1/data-control/${ds.id}/filter-groups?options=${filterOpts}`);
  }

  await browser.close();
  fs.writeFileSync('/tmp/pdp-other-datasets.json', JSON.stringify({ found, policies }, null, 2));
  for (const ds of found) {
    const pol = policies[ds.id]?.data;
    console.log(ds.name, ds.id, Array.isArray(pol) ? pol.map((p) => p.name) : pol);
  }
}

main();
