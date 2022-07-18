import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '../../context';
import '../../css/ProductCard.css';

export default function ProductCard(props) {
  const { id, name, price, urlImage } = props;
  const { pedidosData, setPedidosData } = useContext(ContextProject);

  const [quantidade, setQuantidade] = useState(0);

  const somaValor = () => {
    const newQuantidade = quantidade + 1;
    setQuantidade(newQuantidade);
    const subtotal = newQuantidade * price;

    const verificaProd = pedidosData.produtos.filter((item) => item.id === id);

    if (verificaProd.length === 0) {
      pedidosData.produtos.push({ id, name, price, quantidade: newQuantidade, subtotal });
      console.log(pedidosData.produtos);
      return setPedidosData(pedidosData);
    }
    const novaQuantidade = pedidosData.produtos.map((pedido) => {
      if (pedido.id === verificaProd[0].id) {
        pedido.quantidade = newQuantidade;
        pedido.subtotal = subtotal;
        console.log(pedidosData.produtos);
      }
      return pedido;
    });
    const newPedidos = pedidosData;
    newPedidos.produtos = novaQuantidade;
    setPedidosData(newPedidos);
  };

  const subtraiValor = () => {
    if (quantidade === 0) {
      button.disabled = true;
    }

    const descQuantidade = quantidade - 1;
    setQuantidade(descQuantidade);

    const verificaProd = pedidosData.produtos.filter((item) => item.id === id);
    if (verificaProd[0].quantidade === 1) {
      pedidosData.produtos.filter((pedidos) => pedidos.id !== id);
      console.log(pedidosData.produtos);
      return setPedidosData(pedidosData);
    }

    const novaQuantidade = pedidosData.produtos.map((pedido) => {
      if (pedido.id === verificaProd[0].id) {
        pedido.quantidade = descQuantidade;
        console.log(pedidosData.produtos);
      }
      return pedido;
    });
    pedidosData.produtos = novaQuantidade;
    setPedidosData(pedidosData);
  };

  return (
    <div className="cardProductContainer">
      <div>
        <p className="preco">
          {` R$ ${price.toFixed(2).toString().replace('.', ',')}`}
        </p>
        <img className="imagem" src={ urlImage } alt="imagem do produto" width="200" />
      </div>
      <p>{name}</p>
      <div className="butoesContainer">
        <button
          className="buttons"
          type="button"
          onClick={ () => somaValor() }
        >
          +
          {' '}
        </button>
        <p>{quantidade}</p>
        <button
          className="buttons"
          type="button"
          disabled={ (quantidade === 0) }
          onClick={ () => subtraiValor() }
        >
          -
        </button>
      </div>
      <div />
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};
