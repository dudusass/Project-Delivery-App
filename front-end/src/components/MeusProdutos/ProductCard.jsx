import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '../../context';
import '../../css/ProductCard.css';

export default function ProductCard(props) {
  const { id, name, price, urlImage } = props;
  const { pedidosData, setPedidosData, updateCarrinho } = useContext(ContextProject);

  const [quantidade, setQuantidade] = useState(0);

  const setValueQuantidade = (target) => {
    if (Number(target)) {
      setQuantidade(Number(target));
      const subtotal = Number(target) * price;

      const verificaProd = pedidosData.produtos.filter((item) => item.id === id);

      if (verificaProd.length === 0) {
        pedidosData.produtos.push({ id, name, price, quantidade: target, subtotal });
        setPedidosData(pedidosData);
        return updateCarrinho(verificaProd);
      }

      const newProdutos = pedidosData.produtos.map((pedido) => {
        if (pedido.id === verificaProd[0].id) {
          pedido.quantidade = target;
          pedido.subtotal = subtotal;
        }
        return pedido;
      });
      const newPedidos = pedidosData;
      newPedidos.produtos = newProdutos;
      setPedidosData(newPedidos);
      updateCarrinho(verificaProd);
    }
  };

  const somaValor = () => {
    const newQuantidade = quantidade + 1;
    setQuantidade(newQuantidade);
    const subtotal = newQuantidade * price;

    const verificaProd = pedidosData.produtos.filter((item) => item.id === id);

    if (verificaProd.length === 0) {
      pedidosData.produtos.push({ id, name, price, quantidade: newQuantidade, subtotal });
      setPedidosData(pedidosData);
      updateCarrinho(verificaProd);
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
    updateCarrinho(verificaProd);
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
      pedidosData.produtos = pedidosData.produtos.filter((pedidos) => pedidos.id !== id);
      setPedidosData(pedidosData);
      updateCarrinho(verificaProd);
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
    updateCarrinho(verificaProd);
  };

  return (
    <div className="cardProductContainer">
      <div>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
          className="preco"
        >
          {` R$ ${price.toFixed(2).toString().replace('.', ',')}`}
        </p>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          className="imagem"
          src={ urlImage }
          alt="imagem do produto"
          width="200"
        />
      </div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <div className="butoesContainer">
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          className="buttons"
          type="button"
          onClick={ () => subtraiValor() }
        >
          -
          {' '}
        </button>
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          className="inputValue"
          onChange={ ({ target }) => setValueQuantidade(target.value) }
          value={ quantidade }
        />
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          className="buttons"
          type="button"
          disabled={ (quantidade === 0) }
          onClick={ () => somaValor() }
        >
          +
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
