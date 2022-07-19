import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '.';

const pedidosMock = {
  produtos: [],
  total: 0,
};

export default function Provider({ children }) {
  const [productData, setProductData] = useState([]);
  const [pedidosData, setPedidosData] = useState(pedidosMock);
  const [totalCarrinho, updateCarrinho] = useState(0);

  const functions = {
    productData,
    setProductData,
    pedidosData,
    setPedidosData,
    totalCarrinho,
    updateCarrinho,
  };

  return (
    <ContextProject.Provider value={ functions }>
      {children}
    </ContextProject.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
