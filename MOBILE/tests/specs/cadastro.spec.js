import CadastroPage from '../pageobjects/cadastro.page.js';

describe('Cadastro de usuário', () => {
    it('Deve preencher e enviar o formulário de cadastro', async () => {
        const dados = {
            firstName: 'Pedro',
            lastName: 'Teste',
            phone: '11987654321',
            email: `pedro.teste.${Date.now()}@example.com`,
            password: 'Teste123!',
            repassword: 'Teste123!'
        };
        
        await CadastroPage.cadastrar(dados);
    });
});
