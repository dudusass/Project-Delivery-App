import React from 'react';
import PropTypes from 'prop-types';
import '../../css/PedidosCard.css';

function PedidosCard(props) {
  const { pedido, status, data, preco } = props;

  return (
    <div className="pedidosContainer">
      <div className="pedidos">
        <p>{`Pedido${pedido}`}</p>
      </div>
      <div className="status">
        <p>{`${status}`}</p>
      </div>
      <div className="data">
        <p>{`${data}`}</p>
        <p>{`R$ ${preco.toFixed(2).toString().replace('.', ',')}`}</p>
      </div>
    </div>
  );
}

PedidosCard.propTypes = {
  pedido: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  preco: PropTypes.number.isRequired,
};

export default PedidosCard;
