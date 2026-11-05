
class CadastroPage {

    acessarCadastro() {
        cy.visit('/minha-conta/');
    }

    preencherEmail(email) {
        cy.get('[name="email"]').type(email);
    }

    preencherSenha(senha) {
        cy.get('.register > :nth-child(2) > [name="password"]').type(senha);
    }

    clicarBotaoCadastrar() {
        cy.get('[name="register"]').click();
    }

    mensagemSucesso() {
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,');
    }

    mensagemErro() {
        cy.get('.woocommerce-error').should('exist');
    }

    mensagemSenhaFraca() {
        cy.get('.woocommerce-password-strength').should('exist');
    }
}


export default new CadastroPage();