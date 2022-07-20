import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import PedidosCard from '../components/MeusPedidos/PedidosCard';
import '../css/MeusPedidos.css';

export default function MeusPedidos() {
  const [pedidosData, setPedidosData] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const pedidosResult = (await axios.get('https://mocks-trybe.herokuapp.com/pedidos')).data;
        setPedidosData(pedidosResult);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const mapPedidosCards = () => pedidosData
    .map((pedidos, index) => (<PedidosCard key={ index } id={ index } { ...pedidos } />));

  return (
    <>
      <Navbar />
      <div className="meusPedidosContainer">
        { (pedidosData.length > 0) && mapPedidosCards() }
      </div>
    </>
  );
}
