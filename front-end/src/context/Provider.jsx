import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '.';

export default function Provider({ children }) {
  const [valorCarrinho, setValorCarrinho] = useState([]);
  const [productData, setProductData] = useState([]);
  const [pedidosData, setPedidosData] = useState([]);
  const [pedidoFinal, setPedidoFinal] = useState([]);

  const functions = {
    valorCarrinho,
    setValorCarrinho,
    pedidoFinal,
    setPedidoFinal,
    productData,
    setProductData,
    pedidosData, 
    setPedidosData,
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
