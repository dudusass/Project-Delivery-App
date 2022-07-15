import React, { useContext } from 'react';
import ContextProject from '../../context';
import '../../css/CarrinhoPreco.css';

export default function CarrinhoPreco() {
  const { valorCarrinho } = useContext(ContextProject);

  return (
    <div className="carrinhoPrecoContainer">
      0
      {/* {`Ver Carrinho: R$${valorCarrinho.toFixed(2).toString().replace('.', ',')}`} */}
    </div>
  );
}
