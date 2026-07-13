import puppeteer from 'puppeteer';
import fs from 'fs';

async function setup() {
  const { execSync } = await import('child_process');
  const USER_DATA = '/tmp/chrome-pdp-next';
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
  const results = { search: [], datasets: {} };

  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });

  const terms = [
    'domo_regis.MonthlyMetrics',
    'MonthlyMetrics',
    'Store Scorecard Data',
    'Store Scorecard Data_Brand Peers',
    'Daily Sales Indexed by Store 2',
    'DimSalon',
  ];

  for (let offset = 0; offset < 800; offset += 100) {
    const res = await api(page, `/api/data/v3/datasources?limit=100&offset=${offset}&sort=name`);
    const arr = res?.data?.data;
    if (!Array.isArray(arr) || !arr.length) break;
    for (const ds of arr) {
      if (terms.some((t) => ds.name === t || ds.name?.includes(t.replace('domo_regis.', '')))) {
        results.search.push({ id: ds.id, name: ds.name, tags: ds.tags, owner: ds.owner?.name });
      }
    }
  }

  const filterOpts =
    'load_associations,include_open_policy,load_filters,sort&paginate=true&&limit=50&offset=0';
  const unique = [...new Map(results.search.map((d) => [d.id, d])).values()];

  for (const ds of unique) {
    await page.goto(`https://regiscorp.domo.com/datasources/${ds.id}/details/rls`, {
      waitUntil: 'networkidle2',
      timeout: 120000,
    });
    await new Promise((r) => setTimeout(r, 5000));
    results.datasets[ds.id] = {
      ...ds,
      body: await page.evaluate(() => document.body.innerText.slice(0, 50000)),
      rowPolicies: await api(
        page,
        `/api/query/v1/data-control/${ds.id}/filter-groups?options=${filterOpts}`,
      ),
      meta: await api(page, `/api/data/v3/datasources/${ds.id}`),
    };
  }

  await browser.close();
  fs.writeFileSync('/tmp/pdp-next-capture.json', JSON.stringify(results, null, 2));

  for (const ds of unique) {
    const pol = results.datasets[ds.id]?.rowPolicies?.data;
    console.log(
      ds.name,
      ds.id,
      Array.isArray(pol) ? pol.map((p) => `${p.name}:${JSON.stringify(p.parameters || 'open')}`) : pol,
    );
  }
}

main();
