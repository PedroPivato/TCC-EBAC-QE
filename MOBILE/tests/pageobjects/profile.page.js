
import { $ } from '@wdio/globals';

class ProfilePage {
    get profileTab() {
        return $('//android.view.View[@content-desc=", Profile"]');
    }

    get signUpButton() {
        return $('~Sign Up');
    }

    get editProfile() {
        return $('~Edit Profile');
    }

    async abrirProfile() {
        await browser.pause(15000);
        await this.profileTab.click();
    }

    async abrirCadastro() {
        await this.signUpButton.click();
    }

    async validarPerfilAutenticado() {
        await this.editProfile.waitForDisplayed({ timeout: 5000 });
    }

    async acessarPerfil() {
        await browser.pause(50000);
        await this.profileTab.click();
    }
}

export default new ProfilePage();
