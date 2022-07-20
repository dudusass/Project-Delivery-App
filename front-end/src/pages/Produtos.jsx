import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../localStorage/localStorage';
import ProductCard from '../components/MeusProdutos/ProductCard';
import CarrinhoPreco from '../components/Carrinho/CarrinhoPreco';
import Navbar from '../components/Navbar/Navbar';
import ContextProject from '../context';
import '../css/Produtos.css';

export default function Produtos() {
  const { productData, setProductData } = useContext(ContextProject);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getStorage('user');
    (async () => {
      try {
        let productResult = await axios
          .get('http://localhost:3001/api/products',
            { headers: { authorization: user.token } });

        productResult = productResult.data
          .map((iten) => ({ ...iten, price: parseFloat(iten.price) }));
        setProductData(productResult);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navigate, setProductData]);

  const mapProdutos = () => productData
    .map((produto, index) => (<ProductCard
      key={ index }
      { ...produto }
      produtos={ productData }
    />));

  return (
    <div>
      <Navbar />
      <div className="produtosContainer">
        { (productData.length > 0) && mapProdutos() }
      </div>
      <div>
        <CarrinhoPreco />
      </div>
    </div>
  );
}
