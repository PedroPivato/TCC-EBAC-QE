
class ProdutoPage {

  selecionarProdutoPorNome(nomeProduto) {
    cy.contains('.product-block', nomeProduto).click();
  }

  selecionarVariacao(tamanho, cor) {
    if (tamanho) cy.get(`.button-variable-item-${tamanho}`).click();
    if (cor) cy.get(`.button-variable-item-${cor}`).click();
  }

  selecionarQuantidade(qtd) {
    if (qtd) cy.get('.quantity').clear().type(qtd);
  }

  adicionarAoCarrinho() {
    cy.get('.single_add_to_cart_button').click();
  }

  verCarrinho() {
    cy.get('.woocommerce-message > .button').click();
  }

  totalCarrinho() {
    return cy.get('.order-total > td');
  }
}

export default new ProdutoPage();