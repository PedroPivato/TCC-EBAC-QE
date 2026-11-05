/// <reference types="cypress" />
import LoginPage from '../pages/LoginPage';


beforeEach(() => {
    cy.visit('minha-conta/');
});

describe('Login', () => {

    it('Deve logar com sucesso com usuário válido', () => {

        cy.env(['usuarioValido', 'senhaValida']).then(({usuarioValido, senhaValida}) => {

        LoginPage.inserirEmail(usuarioValido);
        LoginPage.inserirSenha(senhaValida);
        LoginPage.clicarBotaoLogin();
        LoginPage.validarLoginComSucesso();
    });
    });

    it('Deve exibir mensagem de erro ao logar com usuário inválido', () => {
        LoginPage.inserirEmail('login');
        LoginPage.inserirSenha('teste');
        LoginPage.clicarBotaoLogin();
        LoginPage.validarMensagemErro();
    })

    it('Deve exibir mensagem de erro ao logar com senha inválida', () => {
        LoginPage.inserirEmail('teste12345@teste.com');
        LoginPage.inserirSenha('senha_invalida');
        LoginPage.clicarBotaoLogin();
        LoginPage.validarMensagemErro();
    });
});