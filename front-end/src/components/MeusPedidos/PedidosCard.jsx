import React from 'react';
import PropTypes from 'prop-types';
import '../../css/PedidosCard.css';

function PedidosCard(props) {
  const { id, pedido, status, data, preco } = props;

  return (
    <div className="pedidosContainer">
      <div className="pedidos">
        <p
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {`Pedido${pedido}`}
        </p>
      </div>
      <div className="status">
        <p>{`${status}`}</p>
      </div>
      <div className="data">
        <p data-testid={ `customer_orders__element-order-date-${id}` }>{`${data}`}</p>
        <p
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          {`R$ ${preco.toFixed(2).toString().replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
}

PedidosCard.propTypes = {
  id: PropTypes.number.isRequired,
  pedido: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  preco: PropTypes.number.isRequired,
};

export default PedidosCard;
