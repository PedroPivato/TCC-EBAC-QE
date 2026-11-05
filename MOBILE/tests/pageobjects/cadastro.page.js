
import { $ } from '@wdio/globals';

class CadastroPage {
    get profileTab() {
        return $('//android.view.View[@content-desc=", Profile"]');
    }

    get signUpButton() {
        return $('//android.widget.TextView[@text="Sign up"]');
    }

    get firstNameInput() {
        return $('//android.widget.EditText[@resource-id="firstName"]');
    }

    get lastNameInput() {
        return $('//android.widget.EditText[@resource-id="lastName"]');
    }

    get phoneInput() {
        return $('//android.widget.EditText[@resource-id="phone"]');
    }

    get emailInput() {
        return $('//android.widget.EditText[@resource-id="email"]');
    }

    get passwordInput() {
        return $('//android.widget.EditText[@resource-id="password"]');
    }

    get confirmPasswordInput() {
        return $('//android.widget.EditText[@resource-id="repassword"]');
    }

    get createButton() {
        return $('//android.view.ViewGroup[@content-desc="Create"]');
    }

    async abrirFormulario() {
        await browser.pause(50000);
        await this.profileTab.click();
        await this.signUpButton.click();
    }

    async preencherCadastro(dados) {
        await this.firstNameInput.setValue(dados.firstName);
        await this.lastNameInput.setValue(dados.lastName);
        await this.phoneInput.setValue(dados.phone);
        await this.emailInput.setValue(dados.email);
        await this.passwordInput.setValue(dados.password);
        await this.confirmPasswordInput.setValue(dados.repassword);
    }

    async cadastrar(dados) {
        await this.abrirFormulario();
        await this.preencherCadastro(dados);
        await this.createButton.click();
    }
}

export default new CadastroPage();
