/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import CadastroPage from '../pages/CadastroPage';

const email = faker.internet.email();
const senha = faker.internet.password();

beforeEach(() => {
    CadastroPage.acessarCadastro();
});

describe('Cadastro', () => {
    it('Deve cadastrar com sucesso com usuário válido', () => {
        CadastroPage.preencherEmail(email);
        CadastroPage.preencherSenha(senha);
        CadastroPage.clicarBotaoCadastrar();
        CadastroPage.mensagemSucesso();
    });

    it('Deve exibir mensagem de erro ao cadastrar com usuário inválido', () => {
        CadastroPage.preencherEmail('teste@teste');
        CadastroPage.preencherSenha(senha);
        CadastroPage.clicarBotaoCadastrar();
        CadastroPage.mensagemErro();
    });

    it('Deve exibir mensagem de senha fraca', () => {
        CadastroPage.preencherEmail(email);
        CadastroPage.preencherSenha('123');
        CadastroPage.mensagemSenhaFraca();
        CadastroPage.clicarBotaoCadastrar();
        
    });
});