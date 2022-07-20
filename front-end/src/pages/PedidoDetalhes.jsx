import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DetalhesPedido from '../components/DetalhesPedidos/DetalhesPedido';
import { getStorage } from '../localStorage/localStorage';
import Navbar from '../components/Navbar/Navbar';
import dateFormato from '../utils/dateFormat';

const dataTestId = [
  'customer_order_details__element-order-details-label-delivery-status',
];

export default function PedidoDetalhes() {
  const [detalhePedido, setDetalhePedido] = useState([]);
  const [vendedor, setVendedor] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const user = getStorage('user');
    (async () => {
      try {
        let sellersResu = await axios.get('http://localhost:3001/api/sellers',
          { headers: { authorization: user.token } });
        const pedidoResu = await axios.get(`http://localhost:3001/api/sales/${params.id}`,
          { headers: { authorization: user.token } });
        const pediArr = [pedidoResu.data];
        sellersResu = sellersResu.data.filter((item) => item.id === pediArr[0].sellerId);
        setVendedor(sellersResu[0].name);
        setDetalhePedido(pediArr);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navigate, params.id]);

  return (
    <div>
      <Navbar />
      { (detalhePedido.length > 0) && detalhePedido.map((order, index) => (
        <div key={ index }>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { order.id }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { vendedor }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {dateFormato(order.saleDate)}
          </p>
          <p
            data-testid={ dataTestId[0] }
          >
            { order.status }
          </p>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled
          >
            MARCAR COMO ENTREGUE
          </button>
          { order.saleProduct.map((item, o) => (
            <DetalhesPedido
              key={ o }
              { ...item.product }
              quantity={ item.quantity }
              index={ o }
            />))}
          <button
            type="button"
            data-testid="customer_order_details__element-order-total-price"
          >
            { `TOTAL: ${order.totalPrice.replace('.', ',')}` }
          </button>
        </div>
      ))}
    </div>
  );
}
