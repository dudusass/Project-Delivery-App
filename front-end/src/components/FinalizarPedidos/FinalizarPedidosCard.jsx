import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '../../context';
import '../../css/PedidosCard.css';

function FinalizarPedidosCard(props) {
  const { id, item, name, price, quantity, subtotal } = props;
  const { pedidosData, setPedidosData, updateCarrinho } = useContext(ContextProject);

  const removerItem = () => {
    const novosPedidos = pedidosData.produtos.filter((it) => it.id !== id);
    pedidosData.produtos = novosPedidos;
    setPedidosData(pedidosData);
    updateCarrinho(novosPedidos);
  };

  return (
    <div className="finalizar-pedidos-container">
      <p
        data-testid={ `customer_checkout__element-order-table-item-number-${item}` }
      >
        { item + 1}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-name-${item}` }
      >
        { name }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${item}` }
      >
        { quantity }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${item}` }
      >
        { price.toFixed(2).toString().replace('.', ',') }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${item}` }
      >
        { subtotal.toFixed(2).toString().replace('.', ',') }
      </p>
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${item}` }
        type="button"
        onClick={ () => removerItem() }
      >
        Remover Item
      </button>
    </div>
  );
}

FinalizarPedidosCard.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
};

export default FinalizarPedidosCard;
