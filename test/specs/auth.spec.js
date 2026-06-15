import { expect } from '@wdio/globals';
import authPage from '../pageobjects/auth.page.js';
import { openCleanApp } from '../helpers/browserHelpers.js';
import { uniqueName } from '../helpers/testData.js';

describe('Authentication', () => {
  beforeEach(async () => {
    await openCleanApp();
  });

  it('registers, logs out, and logs in an existing user', async () => {
    const name = uniqueName('Auth');
    await authPage.register(name);
    await expect(authPage.greeting).toHaveText(expect.stringContaining(name));

    await authPage.logout();
    await authPage.login(name);
    await expect(authPage.greeting).toHaveText(expect.stringContaining(name));
  });

  it('rejects empty and one-character names', async () => {
    await authPage.submitRegistration('');
    await expect(authPage.error).toBeDisplayed();

    await authPage.submitRegistration('A');
    await expect(authPage.error).toBeDisplayed();
  });

  it('rejects duplicate registration names', async () => {
    const name = uniqueName('Duplicate');
    await authPage.register(name);
    await authPage.logout();
    await authPage.switchToRegister();
    await authPage.submitRegistration(name);

    await expect(authPage.error).toBeDisplayed();
  });

  it('rejects login with an unknown user name', async () => {
    await authPage.submitLogin(uniqueName('Unknown'));

    await expect(authPage.error).toBeDisplayed();
    await expect(authPage.form).toBeDisplayed();
  });
});
