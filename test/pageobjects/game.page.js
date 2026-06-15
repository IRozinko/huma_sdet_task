import { byTestId } from '../helpers/selectors.js';

class GamePage {
  get board() { return $(byTestId('board')); }
  get cells() { return $$('[data-testid^="cell-"]'); }
  get status() { return $(byTestId('status')); }
  get difficulty() { return $(byTestId('select-difficulty')); }
  get hintButton() { return $(byTestId('btn-hint')); }
  get newGameButton() { return $(byTestId('btn-new')); }
  get resetButton() { return $(byTestId('btn-reset')); }

  cell(index) {
    return $(byTestId(`cell-${index}`));
  }

  async states() {
    return browser.execute(() =>
      [...document.querySelectorAll('[data-testid^="cell-"]')]
        .map((cell) => cell.getAttribute('data-state')));
  }

  async count(state) {
    return (await this.states()).filter((value) => value === state).length;
  }

  async play(index) {
    await this.cell(index).click();
  }

  async waitForComputerResponse() {
    await browser.waitUntil(async () => {
      const status = await this.status.getAttribute('data-status');
      return (await this.count('o')) >= 1 ||
        ['human', 'computer', 'draw'].includes(status);
    }, {
      timeout: 5000,
      timeoutMsg: 'Computer did not make a move or finish the game'
    });
  }

  async selectDifficulty(value) {
    await this.difficulty.selectByAttribute('value', value);
  }

  async playToCompletion() {
    for (let turn = 0; turn < 5; turn += 1) {
      const status = await this.status.getAttribute('data-status');
      if (['human', 'computer', 'draw'].includes(status)) return status;

      const index = await browser.execute(() => {
        const cells = [...document.querySelectorAll('[data-testid^="cell-"]')];
        return cells.findIndex((cell) =>
          cell.getAttribute('data-state') === 'empty' && !cell.disabled);
      });
      if (index < 0) continue;

      await this.cell(index).click();
      await browser.waitUntil(async () => {
        const currentStatus = await this.status.getAttribute('data-status');
        return currentStatus !== 'computer-thinking';
      }, {
        timeout: 5000,
        timeoutMsg: 'Game did not return control or reach a terminal state'
      });
    }

    return await this.status.getAttribute('data-status');
  }
}

export default new GamePage();
