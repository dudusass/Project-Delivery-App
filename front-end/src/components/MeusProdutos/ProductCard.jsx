import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ContextProject from '../../context';
import '../../css/ProductCard.css';

export default function ProductCard(props) {
  const {valorCarrinho, setValorCarrinho} = useContext(ContextProject);
  const { id, nome, imagem, preco, produtos } = props;
  
  const [quantidade, setQuantidade] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  /*   function verificaQuantidade() {
    if (quantidade > 0) {
      setPedidoFinal([...{ name: nome, quantidade, valor: preco, subTotal }]);
    }
  }

  useEffect(() => {
    console.log('funcionando');
    return () => { verificaQuantidade(); };
  }, [verificaQuantidade]); */

  const somaValor = () => {
    console.log(id);
    console.log(produtos);
  /*   const soma = quantidade + 1;
    setQuantidade(soma);
    const valorTotal = valorCarrinho + preco;
    const subTotalProduto = subTotal + preco;
    setValorCarrinho(valorTotal);
    setSubTotal(subTotalProduto); */
  };

  const subtraiValor = () => {
    if (quantidade === 0) {
      button.disabled = true;
    }
    const subtracao = quantidade - 1;
    setQuantidade(subtracao);
    const valorTotal = valorCarrinho - preco;
    const subTotalProduto = subTotal - preco;
    setValorCarrinho(valorTotal);
    setSubTotal(subTotalProduto);
  };

  return (
    <div className="cardProductContainer">
      <div>
        <p className="preco">
          {` R$ ${preco.toFixed(2).toString().replace('.', ',')}`}
        </p>
        <img className="imagem" src={ imagem } alt="imagem do produto" width="200" />
      </div>
      <p>{nome}</p>
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
  nome: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  preco: PropTypes.number.isRequired,
};
