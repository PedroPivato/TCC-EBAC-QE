import LoginPage from '../pageobjects/login.page.js';
import ProfilePage from '../pageobjects/profile.page.js';
import usuario from '../data/usuario.js';

describe('Login de usuário', () => {
    it('Deve preencher e enviar o formulário de login', async () => {

        await browser.pause(15000);
        await ProfilePage.acessarPerfil();
        await LoginPage.preencherLogin(usuario.email, usuario.password);
    });
});