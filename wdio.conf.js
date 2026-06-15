import fs from 'node:fs';
import path from 'node:path';

const isHeadless = process.env.HEADLESS !== 'false';
const screenshotDir = path.resolve('artifacts/screenshots');

export const config = {
  runner: 'local',
  specs: ['./test/specs/**/*.spec.js'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        ...(isHeadless ? ['--headless=new'] : []),
        '--window-size=1440,1000',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage'
      ]
    }
  }],
  logLevel: 'warn',
  bail: 0,
  baseUrl: 'http://localhost:4173',
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  services: [[
    'static-server',
    {
      folders: [{ mount: '/', path: './' }],
      port: 4173,
      middleware: []
    }
  ]],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  },
  afterTest: async function (test, context, { passed }) {
    if (passed) return;

    fs.mkdirSync(screenshotDir, { recursive: true });
    const safeName = test.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    await browser.saveScreenshot(path.join(screenshotDir, `${safeName}.png`));
  }
};
