const saveCartItems = (itensAtualizados) => {
  console.log('Salvando lista atualizada...');

  localStorage.setItem('cartItems', itensAtualizados);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
