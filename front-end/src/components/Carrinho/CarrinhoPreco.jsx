import React, { useContext, useEffect, useState } from 'react';
import ContextProject from '../../context';
import '../../css/CarrinhoPreco.css';

export default function CarrinhoPreco() {
  const { pedidosData, totalCarrinho } = useContext(ContextProject);
  const [carrinho, setTotalCarrinho] = useState(0);

  useEffect(() => {
    const totalItens = pedidosData.produtos
      .reduce((acc, item) => acc + item.subtotal, 0);
    console.log(pedidosData.produtos);
    setTotalCarrinho(totalItens);
  }, [totalCarrinho]);

  return (
    <div className="carrinhoPrecoContainer">
      <p>R${carrinho.toFixed(2).toString().replace('.', ',')}</p>
    </div>
  );
}
