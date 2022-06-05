const fetchItem = async (itemID) => {
  try {
  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const resposta = await fetch(url);
  const respostaJSON = await resposta.json();
  return respostaJSON;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
