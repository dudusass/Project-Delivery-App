import React from 'react';
import PropTypes from 'prop-types';

export default function PedidosVendedorCard(props) {
  const { index, name, price, quantity } = props;
  return (
    <>
      <p
        data-testid={ `seller_order_details__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </p>
      <p
        data-testid={ `seller_order_details__element-order-table-name-${index}` }
      >
        { name }
      </p>
      <p
        data-testid={ `seller_order_details__element-order-table-quantity-${quantity}` }
      >
        { quantity }
      </p>
      <p
        data-testid={ `seller_order_details__element-order-table-unit-price-${index}` }
      >
        { price.replace('.', ',') }
      </p>
      <p
        data-testid={ `seller_order_details__element-order-table-sub-total-${index}` }
      >
        {
          (Number(price) * Number(quantity)).toFixed(2).replace('.', ',')
        }
      </p>
    </>
  );
}

PedidosVendedorCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
