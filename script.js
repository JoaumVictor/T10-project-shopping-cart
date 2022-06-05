// listaDeItems é onde eu guardo o caminho onde serão adicionados os items.
const listaDeItems = document.getElementsByClassName('items')[0];
// listadoCarrinho é eu guardo o endereço do carrinho do site.
const listaDoCarrinho = document.getElementsByClassName('cart__items')[0];
const valorDoCarrinho = document.getElementsByClassName('total-price')[0];
const btnLimpar = document.getElementsByClassName('empty-cart')[0];
const loadingIMG = document.getElementsByClassName('loading1')[0];
const container = document.querySelector('.container');

const esperaOFF = () => {
  console.log('A página carregou!');
  loadingIMG.style.display = 'none';
};

const atualizaValor = () => {
const valoresAtuais = listaDoCarrinho.childNodes;
let valorAtualizado = 0;
valoresAtuais.forEach((alvo) => {
  const price = alvo.innerHTML.split('PRICE: $');
  valorAtualizado += parseFloat(price[1]);
});
valorDoCarrinho.innerHTML = valorAtualizado;
};

const limparCarrinho = () => {
  listaDoCarrinho.innerHTML = null;
  saveCartItems(listaDoCarrinho.innerHTML);
  atualizaValor();
};
btnLimpar.addEventListener('click', limparCarrinho);

// Essa função adiciona a imagem ao meu produto em criação.
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

// essa função adiciona um id ou nome ao meu produto em criação.
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

// Essa função é responsável por tirar meu item do carrinho se clicar nele.
const cartItemClickListener = (event) => {
  listaDoCarrinho.removeChild(event.target);
  saveCartItems(listaDoCarrinho.innerHTML);
  atualizaValor();
};

// cria o item que será jogado no carrinho.
const createCartItemElement = (id, nome, price) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${nome} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  listaDoCarrinho.appendChild(li);
  saveCartItems(listaDoCarrinho.innerHTML);
  atualizaValor();
};

// Essa função adiciona o item clicado ao carrinho.
const adicionaItemAoCarrinho = async (alvo) => {
  const produtoClick = alvo.target.parentNode;
  const idDoProduto = produtoClick.childNodes[0].innerText;
  const dados = await fetchItem(idDoProduto);
  createCartItemElement(dados.id, dados.title, dados.price);
};

// Essa função recebe um objeto json e transforma em uma section com id, nome, imagem, e um botão.
const createProductItemElement = ({ sku, name, image }) => {
  const itemList = document.createElement('section');
  // acima eu criei uma section chamada ItemList.
  itemList.className = 'item';
  // acima meu ItemList recebe a classe item.
  itemList.appendChild(createCustomElement('span', 'item__sku', sku));
  // acima meu itemList recebe um span com a classe item__sku e o conteudo sku que é o id.
  itemList.appendChild(createCustomElement('span', 'item__title', name));
  // acima meu itemList recebe um span com a classe item__title e o conteudo name.
  itemList.appendChild(createProductImageElement(image));
  // acima meu itemList recebe a imagem do produto.
  const adicionaBut = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  adicionaBut.addEventListener('click', adicionaItemAoCarrinho);
  itemList.appendChild(adicionaBut);
  // acima meu itemList recebe um botão com o nome add ao carrinho que se clicado joga o item atual ao carrinho.
  listaDeItems.appendChild(itemList);
  // acima eu adicionei a ItemList como filho da listaDeItems.
};

// Essa função pega o meta data da pesquisa 'computador' e joga em createProductItemElement de um em um para ir criando os itens recebidos no site.
const encaminhaProdutos = async () => {
 const elementos = await fetchProducts('computador');
 elementos.results.forEach((alvo) => {
   const objeto = {
    sku: alvo.id,
    name: alvo.title,
    image: alvo.thumbnail,
   };
   createProductItemElement(objeto);
 });
 setTimeout(esperaOFF, 1500);
};

const carregaCarrinho = () => {
  listaDoCarrinho.innerHTML = getSavedCartItems().replace(/'/g, '');
  const alvos = document.getElementsByClassName('cart__item');
  [...alvos].forEach((alvo) => alvo.addEventListener('click', cartItemClickListener));
};

const addLoad = () => {
const load = document.createElement('div');
load.classList += 'loading';
load.innerText = 'Carregando...';
container.appendChild(load);
};

const removeLoad = () => {
const apagar = document.querySelector('.loading');
apagar.remove();
};

window.onload = async () => {
  addLoad();
  await encaminhaProdutos();
  removeLoad();
  carregaCarrinho();
  atualizaValor();
};
