const fetchProducts = async (id) => {
  try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
  const response = await fetch(url);
  const listaJSON = await response.json();
  return listaJSON;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
