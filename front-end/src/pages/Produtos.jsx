import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import ProductCard from '../components/MeusProdutos/ProductCard';
import CarrinhoPreco from '../components/Carrinho/CarrinhoPreco';
import Navbar from '../components/Navbar/Navbar';
import ContextProject from '../context';
import '../css/Produtos.css';

export default function Produtos() {
  const { productData, setProductData } = useContext(ContextProject);

  useEffect(() => {
    (async () => {
      try {
        const productResult = (await axios
          .get('https://mocks-trybe.herokuapp.com/produtos')).data
        setProductData(productResult);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const mapProdutos = () => productData
    .map((produto, index) => (<ProductCard 
      key={index} { ...produto } produtos={productData} 
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
