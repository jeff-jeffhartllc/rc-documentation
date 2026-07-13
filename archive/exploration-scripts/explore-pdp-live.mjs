import puppeteer from 'puppeteer';
import fs from 'fs';
import { execSync } from 'child_process';

const DATASET_ID = '19ae8295-9dab-4277-963a-f9c7aab23f78';
const USER_DATA = '/tmp/chrome-pdp-live';

async function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function setupProfile() {
  execSync(`rm -rf ${USER_DATA} && mkdir -p ${USER_DATA}/Default`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Default/Cookies ${USER_DATA}/Default/`);
  execSync(`cp /home/ubuntu/.config/google-chrome/Local\\ State ${USER_DATA}/ 2>/dev/null || true`);
  execSync(`cp -r /home/ubuntu/.config/google-chrome/Default/Local\\ Storage ${USER_DATA}/Default/ 2>/dev/null || true`);
  execSync(`cp -r /home/ubuntu/.config/google-chrome/Default/Session\\ Storage ${USER_DATA}/Default/ 2>/dev/null || true`);
}

async function apiFetch(page, endpoint) {
  return page.evaluate(async (ep) => {
    try {
      const r = await fetch(ep, { credentials: 'include', headers: { Accept: 'application/json' } });
      const text = await r.text();
      try { return { status: r.status, data: JSON.parse(text) }; }
      catch { return { status: r.status, text: text.slice(0, 8000) }; }
    } catch (e) { return { error: e.message }; }
  }, endpoint);
}

async function scrape(page) {
  return page.evaluate(() => ({
    url: location.href,
    title: document.title,
    body: document.body?.innerText?.slice(0, 60000),
  }));
}

async function main() {
  setupProfile();
  const browser = await puppeteer.launch({
    headless: 'new',
    userDataDir: USER_DATA,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    defaultViewport: { width: 1920, height: 1200 },
  });
  const page = await browser.newPage();
  const results = { api: {}, pages: [] };

  await page.goto('https://regiscorp.domo.com', { waitUntil: 'networkidle2', timeout: 120000 });
  results.home = await scrape(page);

  const endpoints = [
    `/api/data/v3/datasources/${DATASET_ID}/policies`,
    `/api/data/v1/datasources/${DATASET_ID}/policies`,
    `/api/data/v3/datasources/${DATASET_ID}`,
    `/api/identity/v2/groups?limit=300`,
  ];
  for (const ep of endpoints) results.api[ep] = await apiFetch(page, ep);

  const urls = [
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/overview`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/policies`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/pdp`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/data-policies`,
    `https://regiscorp.domo.com/datasources/${DATASET_ID}/details/permissions`,
  ];

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 }).catch(() => {});
    await wait(6000);
    const data = await scrape(page);
    results.pages.push(data);
    if (/polic|pdp|personalized/i.test(data.body || '') || url.includes('polic')) {
      await page.screenshot({ path: '/workspace/assets/daily-sales-master-2-pdp.png', fullPage: false });
      results.screenshot = '/workspace/assets/daily-sales-master-2-pdp.png';
    }
  }

  // Search data center for dataset and open PDP tab
  await page.goto(`https://regiscorp.domo.com/datasources?q=${encodeURIComponent('Daily Sales Master 2')}`, {
    waitUntil: 'networkidle2', timeout: 90000,
  });
  await wait(4000);
  await page.evaluate((id) => {
    const link = document.querySelector(`a[href*="${id}"]`);
    if (link) link.click();
  }, DATASET_ID);
  await wait(5000);
  results.searchOpen = await scrape(page);

  await page.evaluate(() => {
    const tab = [...document.querySelectorAll('a,button,[role="tab"],span,div')]
      .find((el) => /personalized|pdp|polic/i.test(el.textContent || ''));
    if (tab) tab.click();
  });
  await wait(5000);
  results.pdpTab = await scrape(page);
  await page.screenshot({ path: '/workspace/assets/daily-sales-master-2-pdp-tab.png', fullPage: false });

  await browser.close();
  fs.writeFileSync('/tmp/pdp-dsm2-capture.json', JSON.stringify(results, null, 2));

  const policies = results.api[`/api/data/v3/datasources/${DATASET_ID}/policies`]?.data
    || results.api[`/api/data/v1/datasources/${DATASET_ID}/policies`]?.data;
  console.log(JSON.stringify({
    loggedIn: !results.home.body?.match(/SIGN IN/i),
    policyApi: policies ? (Array.isArray(policies) ? policies.length : Object.keys(policies)) : null,
    pdpBodyPreview: results.pdpTab?.body?.slice(0, 500),
  }));
}

main();
