import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../localStorage/localStorage';
import Navbar from '../components/Navbar/Navbar';
import PedidosCard from '../components/MeusPedidos/PedidosCard';
import '../css/MeusPedidos.css';

const user = getStorage('user');

export default function MeusPedidos() {
  const [pedidosData, setPedidosData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');

    (async () => {
      try {
        const sellersResu = await axios.get('http://localhost:3001/api/sales',
          { headers: { authorization: user.token } });
        console.log(sellersResu);
        setPedidosData(sellersResu.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navigate]);

  const mapPedidosCards = () => pedidosData
    .map((pedidos, index) => (
      <PedidosCard key={ index } { ...pedidos } />));

  return (
    <>
      <Navbar />
      <div className="meusPedidosContainer">
        { (pedidosData.length > 0) && mapPedidosCards() }
      </div>
    </>
  );
}
