import puppeteer from 'puppeteer';
import fs from 'fs';
import { execSync } from 'child_process';

const USER_DATA = '/tmp/chrome-capture-flows';
const FLOW_NAMES = [
  'Daily Sales ETL 2',
  'Daily Sales ETL',
  'Daily Sales Master Indexing 2',
  'Daily Sales Master Indexing',
  'Store Scorecard ETL',
  'Store Scorecard by Brand ETL',
  'Corp Employees Daily Sales ETL',
  'Sales by Store by Day ETL',
  'Regis Stock History Builder',
];

const GROUP_IDS = {
  AllDataAccess: '2014419418',
  RestrictedDataAccess: '950576281',
  TerritoryDataAccess: '1547677730',
  TestGroup: '1197243980',
};

function setupProfile() {
  execSync(`rm -rf ${USER_DATA} && mkdir -p ${USER_DATA}/Default`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Default/Cookies ${USER_DATA}/Default/`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Local\\ State ${USER_DATA}/ 2>/dev/null || true`);
}

async function api(page, ep, opts = {}) {
  return page.evaluate(
    async (e, method, body) => {
      const r = await fetch(e, {
        credentials: 'include',
        method: method || 'GET',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      const t = await r.text();
      try {
        return { status: r.status, data: JSON.parse(t) };
      } catch {
        return { status: r.status, text: t.slice(0, 4000) };
      }
    },
    ep,
    opts.method,
    opts.body,
  );
}

async function tryEndpoints(page, endpoints) {
  const out = {};
  for (const ep of endpoints) {
    out[ep] = await api(page, ep);
  }
  return out;
}

async function main() {
  setupProfile();
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: USER_DATA,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });

  const results = { groups: {}, dataflowDiscovery: {}, dataflows: {}, errors: [] };

  for (const [name, id] of Object.entries(GROUP_IDS)) {
    results.groups[name] = await api(page, `/api/identity/v2/groups/${id}`);
  }

  results.dataflowDiscovery = await tryEndpoints(page, [
    '/api/dataprocessing/v1/dataflows?limit=100&offset=0',
    '/api/dataprocessing/v1/dataflows/search?limit=100',
    '/api/magic/v1/dataflows?limit=100',
    '/api/data/v1/dataflows?limit=100',
    '/api/dataprocessing/v2/dataflows?limit=100',
  ]);

  for (const name of FLOW_NAMES) {
    const searchEndpoints = [
      `/api/dataprocessing/v1/dataflows/search?query=${encodeURIComponent(name)}&limit=10`,
      `/api/dataprocessing/v1/dataflows?search=${encodeURIComponent(name)}&limit=10`,
      `/api/magic/v1/dataflows/search?query=${encodeURIComponent(name)}&limit=10`,
    ];
    results.dataflows[name] = { search: {} };
    for (const ep of searchEndpoints) {
      results.dataflows[name].search[ep] = await api(page, ep);
    }
  }

  // List all dataflows if discovery worked
  for (const [ep, res] of Object.entries(results.dataflowDiscovery)) {
    const items =
      res?.data?.data ||
      res?.data?.results ||
      res?.data?.dataflows ||
      (Array.isArray(res?.data) ? res.data : null);
    if (Array.isArray(items) && items.length) {
      results.allFlowsFrom = ep;
      results.allFlows = items.map((f) => ({
        id: f.id || f.dataflowId,
        name: f.name || f.displayName,
        enabled: f.enabled ?? f.isEnabled,
        schedule: f.schedule || f.cron || f.scheduleDescription,
        lastExecution: f.lastExecution || f.lastRun,
      }));
      break;
    }
  }

  if (results.allFlows?.length) {
    for (const flow of results.allFlows.slice(0, 30)) {
      if (!flow.id) continue;
      const detailEndpoints = [
        `/api/dataprocessing/v1/dataflows/${flow.id}`,
        `/api/dataprocessing/v1/dataflows/${flow.id}/schedule`,
        `/api/magic/v1/dataflows/${flow.id}`,
      ];
      flow.detail = {};
      for (const ep of detailEndpoints) {
        flow.detail[ep] = await api(page, ep);
      }
    }
  }

  const outPath = '/workspace/tmp/capture-dataflows-and-groups.json';
  fs.mkdirSync('/workspace/tmp', { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log('Wrote', outPath);
  console.log('Groups:', Object.keys(results.groups).map((k) => `${k}:${results.groups[k]?.status}`).join(', '));
  if (results.allFlows) console.log('Flows found:', results.allFlows.length, 'via', results.allFlowsFrom);

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
