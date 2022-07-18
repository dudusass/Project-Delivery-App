import React, { useContext, useEffect } from 'react';
import ContextProject from '../../context';
import '../../css/CarrinhoPreco.css';

export default function CarrinhoPreco() {
  const { pedidosData } = useContext(ContextProject);
  console.log(pedidosData);

  function getPrice() {
    /*     const totalPrice = pedidosData.produtos
      .reducer((acc, item) => acc + item.subtotal, 0); */
    console.log(pedidosData.produtos);
    // return totalPrice;
  }

  useEffect(() => {
    console.log(pedidosData.produtos);
  }, [pedidosData.produtos]);

  return (
    <div className="carrinhoPrecoContainer">
      0
    </div>
  );
}
