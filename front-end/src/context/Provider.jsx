import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '.';

const pedidosMock = {
  produtos: [
    {
      id: 2,
      nome: "Cerveija Heineken",
      quantidade: 3,
      preco: 8,
      subTotal: 24,
    }
  ],
  total: 300.00
}

export default function Provider({ children }) {
  const [productData, setProductData] = useState([]);
  const [pedidosData, setPedidosData] = useState(pedidosMock);

  const functions = {
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
