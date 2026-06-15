import { expect } from '@wdio/globals';
import basePage from '../pageobjects/base.page.js';
import authPage from '../pageobjects/auth.page.js';
import gamePage from '../pageobjects/game.page.js';
import historyPage from '../pageobjects/history.page.js';
import { openCleanApp } from '../helpers/browserHelpers.js';
import { uniqueName } from '../helpers/testData.js';

describe('Application shell and settings', () => {
  beforeEach(async () => {
    await openCleanApp();
  });

  it('loads the expected title and subtitle', async () => {
    await expect(basePage.title).toHaveText('Tic-Tac-Toe');
    await expect(basePage.subtitle).toHaveText('A small game for test automation');
    await expect(authPage.form).toBeDisplayed();
  });

  it('switches theme and persists it after reload', async () => {
    await expect($('html')).toHaveAttribute('data-theme', 'light');
    await basePage.toggleTheme();
    await expect($('html')).toHaveAttribute('data-theme', 'dark');

    await browser.refresh();
    await expect($('html')).toHaveAttribute('data-theme', 'dark');
  });

  it('switches to Persian RTL and persists it after reload', async () => {
    await basePage.switchLanguage('fa');
    await expect($('html')).toHaveAttribute('lang', 'fa');
    await expect($('html')).toHaveAttribute('dir', 'rtl');
    await expect($('[data-testid="auth-title"]')).not.toHaveText('Welcome');

    await browser.refresh();
    await expect($('html')).toHaveAttribute('lang', 'fa');
    await expect($('html')).toHaveAttribute('dir', 'rtl');
  });

  it('keeps the signed-in user across reload', async () => {
    const name = uniqueName('Persistent');
    await authPage.register(name);

    await browser.refresh();
    await expect(authPage.logoutButton).toBeDisplayed();
    await expect(authPage.greeting).toHaveText(expect.stringContaining(name));
  });

  it('reloading mid-game does not create a spurious history record', async () => {
    const name = uniqueName('MidGame');
    await authPage.register(name);
    await gamePage.board.waitForDisplayed();

    await gamePage.play(0);
    await gamePage.waitForComputerResponse();
    const movesBeforeReload = await gamePage.count('x') + await gamePage.count('o');
    // Sanity: board is not terminal before reload
    expect(movesBeforeReload).toBeGreaterThan(0);

    await browser.refresh();
    await authPage.logoutButton.waitForDisplayed();

    await historyPage.open();
    // A reload mid-game must not have written a history record
    await expect(historyPage.rows).toBeElementsArrayOfSize(0);
  });
});
