import { expect } from '@wdio/globals';
import authPage from '../pageobjects/auth.page.js';
import gamePage from '../pageobjects/game.page.js';
import historyPage from '../pageobjects/history.page.js';
import profilePage from '../pageobjects/profile.page.js';
import { acceptConfirmation, dismissConfirmation, openCleanApp } from '../helpers/browserHelpers.js';
import { uniqueName } from '../helpers/testData.js';

describe('History and statistics', () => {
  beforeEach(async () => {
    await openCleanApp();
    await authPage.register(uniqueName('History'));
  });

  it('records a completed game and updates statistics', async () => {
    const result = await gamePage.playToCompletion();
    expect(['human', 'computer', 'draw']).toContain(result);

    await historyPage.open();
    await expect(historyPage.rows).toBeElementsArrayOfSize(1);

    await profilePage.open();
    expect(await profilePage.totalGames()).toBe(1);
  });

  it('clears completed game history after confirmation', async () => {
    await gamePage.playToCompletion();
    await historyPage.open();
    await acceptConfirmation(() => historyPage.clearButton.click());

    await expect(historyPage.emptyState).toBeDisplayed();
    await expect(historyPage.rows).toBeElementsArrayOfSize(0);
  });

  it('cancels history clearing and keeps existing rows', async () => {
    await gamePage.playToCompletion();
    await historyPage.open();
    await dismissConfirmation(() => historyPage.clearButton.click());

    await expect(historyPage.rows).toBeElementsArrayOfSize(1);
  });
});
