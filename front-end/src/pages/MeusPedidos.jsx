import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import ContextProject from '../context';
import PedidosCard from '../components/MeusPedidos/PedidosCard';
import '../css/MeusPedidos.css';

export default function MeusPedidos() {
  const { pedidosData, setPedidosData } = useContext(ContextProject);

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
    .map((pedidos, index) => (<PedidosCard key={ index } { ...pedidos } />));

  return (
    <div className="meusPedidosContainer">
      { (pedidosData.length > 0) && mapPedidosCards() }
    </div>
  );
}
