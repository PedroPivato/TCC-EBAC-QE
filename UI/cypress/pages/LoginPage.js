
class LoginPage {

    inserirEmail(email) {
        cy.get('[name="username"]').type(email);
    }
    inserirSenha(senha) {
        cy.get('.woocommerce-form > :nth-child(2) > [name="password"]').type(senha);
    }
    clicarBotaoLogin() {
        cy.get('[name="login"]').click();
    }
    validarLoginComSucesso() {
        cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(1)').should('contain', 'Welcome');
    }
    validarMensagemErro() {
        cy.get('.woocommerce-error').should('exist');
    }

}

export default new LoginPage();