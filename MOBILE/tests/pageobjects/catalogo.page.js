
class CatalogoPage extends Page {
  get campoBusca()  { return $('Search Products'); }

  produto(nome) { return $(`android=new UiSelector().textContains("${nome}")`); }

  async buscar(termo) {
    await this.digitar(this.campoBusca, termo);

  }

  async abrirProduto(nome) { await this.tocar(this.produto(nome)); }
}
export default new CatalogoPage();