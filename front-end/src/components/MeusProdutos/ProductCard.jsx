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
      pedidosData.produtos.push({ id, name, price, quantity: newQuantidade, subtotal });
      setPedidosData(pedidosData);
      updateCarrinho(verificaProd);
      return;
    }
    const novaQuantidade = pedidosData.produtos.map((pedido) => {
      if (pedido.id === verificaProd[0].id) {
        pedido.quantity = newQuantidade;
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
    if (verificaProd[0].quantity === 1) {
      pedidosData.produtos = pedidosData.produtos.filter((pedidos) => pedidos.id !== id);
      setPedidosData(pedidosData);
      updateCarrinho(verificaProd);
      return;
    }

    const novaQuantidade = pedidosData.produtos.map((pedido) => {
      if (pedido.id === verificaProd[0].id) {
        pedido.quantity = descQuantidade;
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
<<<<<<< HEAD
        <p data-testid={ `customer_products__element-card-price-${price}` }
=======
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
>>>>>>> 04f975884c8ea2838a7ba9b0eda608f72c90cff3
          className="preco"
        >
          {` R$ ${price.toFixed(2).toString().replace('.', ',')}`}
        </p>
<<<<<<< HEAD
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
=======
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          className="imagem"
          src={ urlImage }
          alt="imagem do produto"
          width="200"
        />
      </div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
>>>>>>> 04f975884c8ea2838a7ba9b0eda608f72c90cff3
      <div className="butoesContainer">
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          className="buttons"
          type="button"
<<<<<<< HEAD
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => somaValor() }
=======
          disabled={ (quantidade === 0) }
          onClick={ () => subtraiValor() }
>>>>>>> 04f975884c8ea2838a7ba9b0eda608f72c90cff3
        >
          -
        </button>
<<<<<<< HEAD
        <p data-testid={ `customer_products__input-card-quantity` }
        >
          { quantidade }
          </p>
=======
        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          className="inputValue"
          onChange={ ({ target }) => setValueQuantidade(target.value) }
          value={ quantidade }
        />
>>>>>>> 04f975884c8ea2838a7ba9b0eda608f72c90cff3
        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          className="buttons"
          type="button"
<<<<<<< HEAD
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          disabled={ (quantidade === 0) }
          onClick={ () => subtraiValor() }
=======
          onClick={ () => somaValor() }
>>>>>>> 04f975884c8ea2838a7ba9b0eda608f72c90cff3
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
