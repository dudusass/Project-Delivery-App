import React from 'react';
import PropTypes from 'prop-types';
import '../../css/PedidosCard.css';

function FinalizarPedidosCard(props) {
  const { item, nome, quantidade, preco, subTotal, valorTotal } = props;

  return (
    <div className="finalizar-pedidos-container">
      <div>
        <p>Item: {item}</p>
      </div>
      <div>
        <p>Descrição: {nome}</p>
      </div>
      <div>
        <p>Quantidade: {quantidade}</p>
      </div>
      <div>
        <p>Valor Unitário: {preco}</p>
      </div>
      <div>
        <p>Sub-Total: {subTotal}</p>
      </div>
      <div>
        <p>Remover Item</p>
      </div>

      <div>
        <p>Valor Total:{valorTotal}</p>
      </div>
    </div>
  );
}

FinalizarPedidosCard.propTypes = {
  item: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  quantidade: PropTypes.number.isRequired,
  preco: PropTypes.number.isRequired,
  subTotal: PropTypes.number.isRequired,
  valorTotal: PropTypes.number.isRequired,
};

export default FinalizarPedidosCard;
