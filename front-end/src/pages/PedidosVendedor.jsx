import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStorage } from '../localStorage/localStorage';
import Navbar from '../components/Navbar/Navbar';
import dateFormato from '../utils/dateFormat';

export default function PedidosVendedor() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = getStorage('user');
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/sales/seller',
          { headers: { authorization: user.token } });
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <Navbar />
      {
        orders.length > 0 && orders.map((item) => (
          <Link
            to={ {
              pathname: `/seller/orders/${item.id}`,
              state: { fromDashboard: true },
            } }
            key={ item.id }
          >
            <p
              data-testid={ `seller_orders__element-order-id-${item.id}` }
            >
              { item.id }
            </p>
            <p
              data-testid={ `seller_orders__element-delivery-status-${item.id}` }
            >
              { item.status }
            </p>
            <p
              data-testid={ `seller_orders__element-order-date-${item.id}` }
            >
              { dateFormato(item.saleDate) }
            </p>
            <p
              data-testid={ `seller_orders__element-card-price-${item.id}` }
            >
              { item.totalPrice }
            </p>
            <p
              data-testid={ `seller_orders__element-card-address-${item.id}` }
            >
              { item.deliveryAddress }
            </p>
          </Link>
        ))
      }
    </div>
  );
}
