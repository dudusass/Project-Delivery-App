import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PedidosVendedorCard from '../components/PedidosVendedor/PedidosVendedorCard';
import { getStorage } from '../localStorage/localStorage';
import Navbar from '../components/Navbar/Navbar';
import dateFormato from '../utils/dateFormat';

const dataTestId = [
  'seller_order_details__element-order-details-label-delivery-status',
];

export default function PedidoVendedor() {
  const [detalhePedido, setDetalhePedido] = useState([]);
  const [statusPedido, setStatusPedido] = useState('');

  const [entrege, setEntregue] = useState(true);
  const [transito, setTransito] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const user = getStorage('user');
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/sales/${params.id}`,
          { headers: { authorization: user.token } });
        const pediArr = [data];
        if (data.status === 'Pendente') setEntregue(false);
        if (data.status === 'Preparando') setTransito(false);
        setStatusPedido(data.status);
        setDetalhePedido(pediArr);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navigate, params.id]);

  const mudarPedido = async ({ target }) => {
    const user = getStorage('user');
    const objctAtualizar = {
      saleId: params.id,
      status: target.name,
    };
    try {
      await axios.patch('http://localhost:3001/api/sales', objctAtualizar,
        { headers: { authorization: user.token } });
      setStatusPedido(target.name);
      if (target.name === 'Preparando') {
        setTransito(false);
        setEntregue(true);
      }
      if (target.name === 'Em Trânsito') setTransito(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      { (detalhePedido.length > 0) && detalhePedido.map((order, index) => (
        <div key={ index }>
          <p
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            { order.id }
          </p>
          <p
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            {dateFormato(order.saleDate)}
          </p>
          <p
            data-testid={ dataTestId[0] }
          >
            { statusPedido }
          </p>
          <button
            type="button"
            name="Preparando"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ entrege }
            onClick={ mudarPedido }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            name="Em Trânsito"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ transito }
            onClick={ mudarPedido }
          >
            SAIU PARA ENTREGA
          </button>
          { order.saleProduct.map((item, o) => (
            <PedidosVendedorCard
              key={ o }
              { ...item.product }
              quantity={ item.quantity }
              index={ o }
            />))}
          <button
            type="button"
            data-testid="seller_order_details__element-order-total-price"
          >
            { `TOTAL: ${order.totalPrice.replace('.', ',')}` }
          </button>
        </div>
      ))}
    </div>
  );
}
