const statusValidatorSeller = (role, status) => {
  if (role === 1 && (status === 'Preparando' || status === 'Em Trânsito')) {
    return true;
  }
  return false;
};

const statusValidatorClient = (role, status) => {
  if (role === 2 && (status === 'Entregue')) {
    return true;
  }
  return false;
};

module.exports = { statusValidatorClient, statusValidatorSeller };