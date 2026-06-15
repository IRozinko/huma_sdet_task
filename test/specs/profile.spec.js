import { expect } from '@wdio/globals';
import authPage from '../pageobjects/auth.page.js';
import profilePage from '../pageobjects/profile.page.js';
import { acceptConfirmation, dismissConfirmation, openCleanApp } from '../helpers/browserHelpers.js';
import { uniqueName } from '../helpers/testData.js';

describe('Profile', () => {
  beforeEach(async () => {
    await openCleanApp();
  });

  it('updates the profile name', async () => {
    await authPage.register(uniqueName('Original'));
    const updatedName = uniqueName('Updated');
    await profilePage.open();
    await profilePage.rename(updatedName);

    await expect(profilePage.success).toBeDisplayed();
    await expect(authPage.greeting).toHaveText(expect.stringContaining(updatedName));
  });

  it('does not allow renaming to an existing user', async () => {
    const firstName = uniqueName('First');
    const secondName = uniqueName('Second');
    await authPage.register(firstName);
    await authPage.logout();
    await authPage.switchToRegister();
    await authPage.register(secondName);
    await profilePage.open();
    await profilePage.rename(firstName);

    await expect(profilePage.error).toBeDisplayed();
  });

  it('deletes the account after confirmation', async () => {
    const name = uniqueName('Delete');
    await authPage.register(name);
    await profilePage.open();
    await acceptConfirmation(() => profilePage.deleteButton.click());

    await expect(authPage.form).toBeDisplayed();
    await authPage.submitLogin(name);
    await expect(authPage.error).toBeDisplayed();
  });

  it('cancels account deletion and keeps the session intact', async () => {
    const name = uniqueName('CancelDelete');
    await authPage.register(name);
    await profilePage.open();
    await dismissConfirmation(() => profilePage.deleteButton.click());

    await expect(profilePage.view).toBeDisplayed();
    await expect(authPage.greeting).toHaveText(expect.stringContaining(name));
  });
});
