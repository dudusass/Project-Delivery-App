import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextProject from '../../context';
import '../../css/CarrinhoPreco.css';

export default function CarrinhoPreco() {
  const { pedidosData, totalCarrinho } = useContext(ContextProject);
  const [carrinho, setTotalCarrinho] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const totalItens = pedidosData.produtos
      .reduce((acc, item) => acc + item.subtotal, 0);
    console.log(pedidosData.produtos);
    setTotalCarrinho(totalItens);
  }, [pedidosData.produtos, totalCarrinho]);

  return (
    <div className="carrinhoPrecoContainer">
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ carrinho <= 0 }
      >
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          Ver Carrinho: R$
          {carrinho.toFixed(2).toString().replace('.', ',')}
        </p>
      </button>
    </div>
  );
}
