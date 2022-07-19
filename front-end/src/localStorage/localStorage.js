const saveStorage = (nT, value) => localStorage.setItem(nT, JSON.stringify(value));
const getStorage = (getItens) => JSON.parse(localStorage.getItem(getItens));
const removeStorage = (item) => localStorage.removeItem(item);

module.exports = {
  saveStorage,
  getStorage,
  removeStorage,
};
