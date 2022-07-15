const saveStorage = (nT, value) => localStorage.setItem(nT, JSON.stringify(value));
const getStorage = (getItens) => JSON.parse(localStorage.getItem(getItens));

module.exports = {
  saveStorage,
  getStorage,
};
