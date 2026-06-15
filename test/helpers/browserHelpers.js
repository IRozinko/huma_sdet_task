export async function openCleanApp() {
  await browser.url('/');
  await browser.execute(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await browser.refresh();
  await $('[data-testid="app"]').waitForDisplayed();
}

export async function acceptConfirmation(action) {
  await action();
  await browser.waitUntil(async () => browser.isAlertOpen(), {
    timeout: 2000,
    timeoutMsg: 'Expected a confirmation dialog to open'
  });
  await browser.acceptAlert();
}

export async function dismissConfirmation(action) {
  await action();
  await browser.waitUntil(async () => browser.isAlertOpen(), {
    timeout: 2000,
    timeoutMsg: 'Expected a confirmation dialog to open'
  });
  await browser.dismissAlert();
}
