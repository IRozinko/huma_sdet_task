import { byTestId } from '../helpers/selectors.js';

class AuthPage {
  get form() { return $(byTestId('auth-form')); }
  get nameInput() { return $(byTestId('input-name')); }
  get registerButton() { return $(byTestId('btn-register')); }
  get loginButton() { return $(byTestId('btn-login')); }
  get switchModeButton() { return $(byTestId('btn-switch-mode')); }
  get error() { return $(byTestId('auth-error')); }
  get logoutButton() { return $(byTestId('btn-logout')); }
  get greeting() { return $(byTestId('hello-user')); }

  async register(name) {
    await this.nameInput.setValue(name);
    await this.registerButton.click();
    await this.logoutButton.waitForDisplayed();
  }

  async switchToLogin() {
    if (await this.loginButton.isExisting()) return;
    await this.switchModeButton.click();
    await this.loginButton.waitForDisplayed();
  }

  async switchToRegister() {
    if (await this.registerButton.isExisting()) return;
    await this.switchModeButton.click();
    await this.registerButton.waitForDisplayed();
  }

  async login(name) {
    await this.switchToLogin();
    await this.nameInput.setValue(name);
    await this.loginButton.click();
    await this.logoutButton.waitForDisplayed();
  }

  async submitLogin(name) {
    await this.switchToLogin();
    await this.nameInput.setValue(name);
    await this.loginButton.click();
  }

  async logout() {
    await this.logoutButton.click();
    await this.form.waitForDisplayed();
  }

  async submitRegistration(name) {
    await this.nameInput.setValue(name);
    await this.registerButton.click();
  }
}

export default new AuthPage();
