import puppeteer from 'puppeteer';
import fs from 'fs';

const DATASETS = [
  { name: 'Daily Sales Master 2', id: '8d851507-f995-4918-abc8-90032b2eff65' },
  { name: 'Daily Sales Master', id: '19ae8295-9dab-4277-963a-f9c7aab23f78' },
];

const GROUP_IDS = ['1197243980', '2014419418', '950576281', '1547677730', '82766453'];

async function setup() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-pdp-all';
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
  });
  const page = await browser.newPage();
  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });

  const results = { groups: {}, datasets: {}, search: [] };

  for (const gid of GROUP_IDS) {
    results.groups[gid] = await api(page, `/api/identity/v2/groups/${gid}`);
  }

  const searchTerms = [
    'Store Scorecard Data',
    'Store Scorecard Data_Brand Peers',
    'Daily Sales Indexed by Store 2',
    'DimSalon',
  ];
  for (const q of searchTerms) {
    const res = await api(
      page,
      `/api/data/v3/datasources?limit=20&offset=0&sort=name&filters=name,contains,${encodeURIComponent(q)}`,
    );
    results.search.push({ q, res });
  }

  const filterOpts =
    'load_associations,include_open_policy,load_filters,sort&paginate=true&&limit=50&offset=0';

  for (const ds of DATASETS) {
    results.datasets[ds.id] = {
      name: ds.name,
      rowPolicies: await api(
        page,
        `/api/query/v1/data-control/${ds.id}/filter-groups?options=${filterOpts}`,
      ),
      columnPolicies: await api(
        page,
        `/api/query/v1/data-control/${ds.id}/column-groups?options=${filterOpts}`,
      ),
      meta: await api(page, `/api/data/v3/datasources/${ds.id}`),
    };
  }

  // Resolve additional dataset IDs from search
  const extra = [];
  for (const item of results.search) {
    const arr = item.res?.data?.data || item.res?.data || [];
    if (Array.isArray(arr)) {
      for (const ds of arr) {
        if (ds?.id && ds?.name) extra.push({ name: ds.name, id: ds.id });
      }
    }
  }
  const seen = new Set(DATASETS.map((d) => d.id));
  for (const ds of extra) {
    if (seen.has(ds.id)) continue;
    seen.add(ds.id);
    results.datasets[ds.id] = {
      name: ds.name,
      rowPolicies: await api(
        page,
        `/api/query/v1/data-control/${ds.id}/filter-groups?options=${filterOpts}`,
      ),
      columnPolicies: await api(
        page,
        `/api/query/v1/data-control/${ds.id}/column-groups?options=${filterOpts}`,
      ),
      meta: await api(page, `/api/data/v3/datasources/${ds.id}`),
    };
  }

  await browser.close();
  fs.writeFileSync('/tmp/pdp-inventory.json', JSON.stringify(results, null, 2));

  for (const [id, d] of Object.entries(results.datasets)) {
    const policies = d.rowPolicies?.data;
    console.log(
      d.name,
      id,
      Array.isArray(policies) ? policies.map((p) => p.name).join(', ') : policies,
    );
  }
}

main();
