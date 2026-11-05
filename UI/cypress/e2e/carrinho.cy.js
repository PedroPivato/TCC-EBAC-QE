/// <reference types="cypress" />
import ProdutoPage from '../pages/ProdutoPage';

beforeEach(() => {
  cy.visit('http://lojaebac.ebaconline.art.br/');
});

describe('Carrinho de compras', () => {
  it('Deve adicionar um produto ao carrinho', () => {
    ProdutoPage.selecionarProdutoPorNome('Ingrid Running Jacket');
    ProdutoPage.selecionarVariacao('M', 'Orange');
    ProdutoPage.adicionarAoCarrinho();
    ProdutoPage.verCarrinho();
    cy.get('.order-total > th').should('contain', 'Total');
  });

  it('Deve impedir mais de 10 unidades do mesmo produto no carrinho', () => {
    ProdutoPage.selecionarProdutoPorNome('Ingrid Running Jacket');
    ProdutoPage.selecionarVariacao('M', 'Orange');
    ProdutoPage.selecionarQuantidade(11);
    ProdutoPage.adicionarAoCarrinho();
    ProdutoPage.verCarrinho();
  });

  it('Deve impedir carrinho com total acima de R$ 990,00', () => {
    ProdutoPage.selecionarProdutoPorNome('Ingrid Running Jacket');
    ProdutoPage.selecionarVariacao('M', 'Orange');
    ProdutoPage.selecionarQuantidade(15);
    ProdutoPage.adicionarAoCarrinho();
    ProdutoPage.verCarrinho();
    ProdutoPage.totalCarrinho()
      .invoke('text')
      .then((textoTotal) => {
        const valorNumerico = parseFloat(
          textoTotal.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
        );

        expect(valorNumerico).to.be.at.most(990);
      });
  });

  it('Deve aplicar desconto de 10% para compras entre R$ 200,00 e R$ 600,00', () => {
    ProdutoPage.selecionarProdutoPorNome('Ingrid Running Jacket');
    ProdutoPage.selecionarVariacao('M', 'Orange');
    ProdutoPage.selecionarQuantidade(3);
    ProdutoPage.adicionarAoCarrinho();
    ProdutoPage.verCarrinho();

    cy.get('.cart-subtotal > td')
      .invoke('text')
      .then((subtotalTexto) => {
        const subtotal = parseFloat(
          subtotalTexto.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
        );

        ProdutoPage.totalCarrinho()
          .invoke('text')
          .then((totalTexto) => {
            const total = parseFloat(
              totalTexto.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
            );

            expect(total).to.be.lessThan(subtotal);
          });
      });
  });
});