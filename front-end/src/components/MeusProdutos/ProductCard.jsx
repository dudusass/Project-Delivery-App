import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '../../context';
import '../../css/ProductCard.css';

export default function ProductCard(props) {
  const { id, name, price, urlImage, produtos } = props;
  const { pedidosData, setPedidosData } = useContext(ContextProject);

  const [quantidade, setQuantidade] = useState(0);

  const somaValor = () => {
    console.log(id);
    console.log(produtos);
    setQuantidade(quantidade + 1);
  };

  const subtraiValor = () => {
    if (quantidade === 0) {
      button.disabled = true;
    }
    setQuantidade(quantidade - 1);
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
  produtos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
