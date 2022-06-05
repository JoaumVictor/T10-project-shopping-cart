const getSavedCartItems = () => {
  const listaAtualizada = localStorage.getItem('cartItems');
  return listaAtualizada;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
