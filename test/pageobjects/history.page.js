import { byTestId } from '../helpers/selectors.js';

class HistoryPage {
  get navButton() { return $(byTestId('nav-history')); }
  get view() { return $(byTestId('view-history')); }
  get emptyState() { return $(byTestId('history-empty')); }
  get rows() { return $$('[data-testid^="history-row-"]'); }
  get clearButton() { return $(byTestId('btn-clear-history')); }

  async open() {
    await this.navButton.click();
    await this.view.waitForDisplayed();
  }
}

export default new HistoryPage();
