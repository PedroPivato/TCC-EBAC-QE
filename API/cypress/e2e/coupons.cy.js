/// <reference types="cypress" />
import 'cypress-plugin-api';

describe('US-0003 - API de Cupons', () => {
  const endpoint = '/wp-json/wc/v3/coupons';

  it('Deve criar um cupom com dados válidos', () => {
    cy.env(['usuarioValido', 'senhaValida']).then(({ usuarioValido, senhaValida }) => {
      cy.api({
        method: 'POST',
        url: endpoint,
        auth: { username: usuarioValido, password: senhaValida },
        body: {
          code: `testeqe${Date.now()}`,
          amount: '10',
          discount_type: 'fixed_product',
          description: 'Cupom de teste automatizado'
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
      });
    });
  });

  it('Não deve criar cupom sem o campo obrigatório "code"', () => {
    cy.env(['usuarioValido', 'senhaValida']).then(({ usuarioValido, senhaValida }) => {
      cy.api({
        method: 'POST',
        url: endpoint,
        auth: { username: usuarioValido, password: senhaValida },
        failOnStatusCode: false,
        body: {
          amount: '10',
          discount_type: 'fixed_product',
          description: 'Cupom sem código'
        }
      }).then((response) => {
        expect(response.status).to.not.eq(201);
        expect(response.body).to.have.property('message', 'Parâmetro(s) ausente(s): code');
      });
    });
  });

  it('Deve retornar 401 ao acessar sem autenticação', () => {
    cy.api({
      method: 'GET',
      url: endpoint,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Sem permissão para listar recursos.');
    });
  });
});

