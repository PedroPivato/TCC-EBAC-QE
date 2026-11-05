import { $ } from '@wdio/globals';

class LoginPage {

    get emailInput() {
        return $('//android.widget.EditText[@resource-id="email"]');
    }

    get passwordInput() {
        return $('//android.widget.EditText[@resource-id="password"]');
    }

    get loginButton() {
        return $('//android.view.ViewGroup[@content-desc="Login"]');
    }

    async preencherLogin(email, senha) {
        await this.emailInput.waitForDisplayed({ timeout: 30000 });

        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(senha);

        await this.loginButton.click();
    }

}

export default new LoginPage();