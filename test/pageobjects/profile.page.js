import { byTestId } from '../helpers/selectors.js';

class ProfilePage {
  get navButton() { return $(byTestId('nav-profile')); }
  get view() { return $(byTestId('view-profile')); }
  get nameInput() { return $(byTestId('input-profile-name')); }
  get saveButton() { return $(byTestId('btn-save-profile')); }
  get success() { return $(byTestId('profile-message')); }
  get error() { return $(byTestId('profile-error')); }
  get wins() { return $(byTestId('profile-wins')); }
  get losses() { return $(byTestId('profile-losses')); }
  get draws() { return $(byTestId('profile-draws')); }
  get deleteButton() { return $(byTestId('btn-delete-account')); }

  async open() {
    await this.navButton.click();
    await this.view.waitForDisplayed();
  }

  async rename(name) {
    await this.nameInput.setValue(name);
    await this.saveButton.click();
  }

  async totalGames() {
    const values = await Promise.all([
      this.wins.getText(),
      this.losses.getText(),
      this.draws.getText()
    ]);
    return values.map(Number).reduce((sum, value) => sum + value, 0);
  }
}

export default new ProfilePage();
