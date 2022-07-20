import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../css/PedidosCard.css';
import dateFormato from '../../utils/dateFormat';

function PedidosCard(props) {
  const { id, status, saleDate, totalPrice } = props;

  return (
    <Link
      to={ {
        pathname: `/customer/orders/${id}`,
        state: { fromDashboard: true },
      } }
    >
      <div className="pedidosContainer">
        <div className="pedidos">
          <p
            data-testid={ `customer_orders__element-order-id-${id}` }
          >
            { id }
          </p>
        </div>
        <div className="status">
          <p
            data-testid={ `customer_orders__element-delivery-status-${id}` }
          >
            {`${status}`}
          </p>
        </div>
        <div className="data">
          <p
            data-testid={ `customer_orders__element-order-date-${id}` }
          >
            {`${dateFormato(saleDate)}`}
          </p>
          <p
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {`R$ ${totalPrice.replace('.', ',')}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

PedidosCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default PedidosCard;
