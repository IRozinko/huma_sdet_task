import { byTestId } from '../helpers/selectors.js';

class BasePage {
  get app() { return $(byTestId('app')); }
  get title() { return $(byTestId('title')); }
  get subtitle() { return $(byTestId('subtitle')); }
  get languageSelect() { return $(byTestId('select-language')); }
  get themeButton() { return $(byTestId('btn-theme')); }

  async open() {
    await browser.url('/');
    await this.app.waitForDisplayed();
  }

  async switchLanguage(language) {
    await this.languageSelect.selectByAttribute('value', language);
  }

  async toggleTheme() {
    await this.themeButton.click();
  }

  async documentAttribute(name) {
    return browser.execute((attribute) =>
      document.documentElement.getAttribute(attribute), name);
  }
}

export default new BasePage();
