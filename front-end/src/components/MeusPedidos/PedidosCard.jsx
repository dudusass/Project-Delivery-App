import React from 'react';
import PropTypes from 'prop-types';
import '../../css/PedidosCard.css';

function PedidosCard(props) {
  const { id, status, saleDate, totalPrice } = props;

  return (
    <div className="pedidosContainer">
      <div className="pedidos">
        <p
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          { id }
        </p>
      </div>
      <div className="status">
        <p>{`${status}`}</p>
      </div>
      <div className="data">
        <p data-testid={ `customer_orders__element-order-date-${id}` }>{`${saleDate}`}</p>
        <p
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          {`R$ ${totalPrice.replace('.', ',')}`}
        </p>
      </div>
    </div>
  );
}

PedidosCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default PedidosCard;
