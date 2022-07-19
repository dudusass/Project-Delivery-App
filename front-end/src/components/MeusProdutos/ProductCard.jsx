import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '../../context';
import '../../css/ProductCard.css';

export default function ProductCard(props) {
  const { id, name, price, urlImage } = props;
  const { pedidosData, setPedidosData, updateCarrinho } = useContext(ContextProject);

  const [quantidade, setQuantidade] = useState(0);

  const somaValor = () => {
    const newQuantidade = quantidade + 1;
    setQuantidade(newQuantidade);
    const subtotal = newQuantidade * price;

    const verificaProd = pedidosData.produtos.filter((item) => item.id === id);

    if (verificaProd.length === 0) {
      pedidosData.produtos.push({ id, name, price, quantidade: newQuantidade, subtotal });
      setPedidosData(pedidosData);
      updateCarrinho(newQuantidade);
      return;
    }
    const novaQuantidade = pedidosData.produtos.map((pedido) => {
      if (pedido.id === verificaProd[0].id) {
        pedido.quantidade = newQuantidade;
        pedido.subtotal = subtotal;
      }
      return pedido;
    });
    const newPedidos = pedidosData;
    newPedidos.produtos = novaQuantidade;
    setPedidosData(newPedidos);
    updateCarrinho(newQuantidade);
  };

  const subtraiValor = () => {
    if (quantidade === 0) {
      button.disabled = true;
    }

    const descQuantidade = quantidade - 1;
    const subtotal = descQuantidade * price;
    setQuantidade(descQuantidade);

    const verificaProd = pedidosData.produtos.filter((item) => item.id === id);
    if (verificaProd[0].quantidade === 1) {
      pedidosData.produtos.filter((pedidos) => pedidos.id !== id);
      setPedidosData(pedidosData);
      updateCarrinho(descQuantidade);
      return;
    }

    const novaQuantidade = pedidosData.produtos.map((pedido) => {
      if (pedido.id === verificaProd[0].id) {
        pedido.quantidade = descQuantidade;
        pedido.subtotal = subtotal;
      }
      return pedido;
    });
    pedidosData.produtos = novaQuantidade;
    setPedidosData(pedidosData);
    updateCarrinho(descQuantidade);
  };

  return (
    <div className="cardProductContainer">
      <div>
        <p data-testid={ `customer_products__element-card-price-${price}` }
          className="preco"
        >
          {` R$ ${price.toFixed(2).toString().replace('.', ',')}`}
        </p>
        <img data-testid={ `customer_products__img-card-bg-image-${urlImage}` }
        className="imagem" 
        src={ urlImage } 
        alt="imagem do produto" 
        width="200" />
      </div>
      <p data-testid={ `customer_products__element-card-title${name}` }
      >
        {name}
      </p>
      <div className="butoesContainer">
        <button
          className="buttons"
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => somaValor() }
        >
          +
          {' '}
        </button>
        <p data-testid={ `customer_products__input-card-quantity` }
        >
          { quantidade }
          </p>
        <button
          className="buttons"
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
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
