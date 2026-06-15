import { expect } from '@wdio/globals';
import authPage from '../pageobjects/auth.page.js';
import gamePage from '../pageobjects/game.page.js';
import { acceptConfirmation, dismissConfirmation, openCleanApp } from '../helpers/browserHelpers.js';
import { uniqueName } from '../helpers/testData.js';

describe('Gameplay', () => {
  beforeEach(async () => {
    await openCleanApp();
    await authPage.register(uniqueName('Game'));
    await gamePage.board.waitForDisplayed();
  });

  it('renders nine cells and processes human and computer moves', async () => {
    await expect(gamePage.cells).toBeElementsArrayOfSize(9);
    await gamePage.play(0);
    await expect(gamePage.cell(0)).toHaveAttribute('data-state', 'x');
    await gamePage.waitForComputerResponse();
    expect(await gamePage.count('x')).toBe(1);
    expect(await gamePage.count('o')).toBeGreaterThanOrEqual(1);
  });

  it('does not allow an occupied cell to be overwritten', async () => {
    await gamePage.play(0);
    await gamePage.waitForComputerResponse();
    const state = await gamePage.cell(0).getAttribute('data-state');

    await expect(gamePage.cell(0)).toBeDisabled();
    await browser.execute(() =>
      document.querySelector('[data-testid="cell-0"]').click());
    await expect(gamePage.cell(0)).toHaveAttribute('data-state', state);
  });

  it('new game and reset clear the board', async () => {
    await gamePage.play(0);
    await gamePage.waitForComputerResponse();
    await gamePage.newGameButton.click();
    expect(await gamePage.count('empty')).toBe(9);

    await gamePage.play(1);
    await gamePage.waitForComputerResponse();
    await gamePage.resetButton.click();
    expect(await gamePage.count('empty')).toBe(9);
  });

  it('changes difficulty and keeps the selected value', async () => {
    await gamePage.selectDifficulty('hard');
    await expect(gamePage.difficulty).toHaveValue('hard');

    await browser.refresh();
    await expect(gamePage.difficulty).toHaveValue('hard');
  });

  it('highlights an available hint without playing it', async () => {
    await gamePage.hintButton.click();
    const hint = $('.cell.is-hint');

    await expect(hint).toBeDisplayed();
    await expect(hint).toHaveAttribute('data-state', 'empty');
    expect(await gamePage.count('x')).toBe(0);
    expect(await gamePage.count('o')).toBe(0);
  });

  it('cancels a mid-game difficulty change and then confirms it', async () => {
    await gamePage.play(0);
    await gamePage.waitForComputerResponse();
    const movesBefore = await gamePage.count('x') + await gamePage.count('o');

    // Cancel: board and difficulty should be unchanged
    const originalDifficulty = await gamePage.difficulty.getValue();
    const newDifficulty = originalDifficulty === 'easy' ? 'hard' : 'easy';
    await dismissConfirmation(() => gamePage.selectDifficulty(newDifficulty));
    await expect(gamePage.difficulty).toHaveValue(originalDifficulty);
    expect(await gamePage.count('x') + await gamePage.count('o')).toBe(movesBefore);

    // Confirm: board resets to empty
    await acceptConfirmation(() => gamePage.selectDifficulty(newDifficulty));
    await expect(gamePage.difficulty).toHaveValue(newDifficulty);
    expect(await gamePage.count('empty')).toBe(9);
  });
});
