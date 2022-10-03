import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../localStorage/localStorage';
import Navbar from '../components/Navbar/Navbar';
import ContextProject from '../context';
import FinalizarPedidosCard from '../components/FinalizarPedidos/FinalizarPedidosCard';

export default function FinalizarPedido() {
  const { pedidosData, totalCarrinho } = useContext(ContextProject);
  const [carrinho, setTotalCarrinho] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [comparFinalizada, setCompraFinalizada] = useState(false);
  const [dadosPedido, setPedidos] = useState({
    vendedor: '', endereco: '', numero: '' });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => setPedidos((prevState) => (
    { ...prevState, [name]: value }));

  useEffect(() => {
    const user = getStorage('user');
    if (!user) navigate('/');

    const totalItens = pedidosData.produtos
      .reduce((acc, item) => acc + item.subtotal, 0);
    setTotalCarrinho(totalItens);

    (async () => {
      try {
        const sellersResu = await axios.get('http://localhost:3001/api/sellers',
          { headers: { authorization: user.token } });
        setSellers(sellersResu.data);
        setPedidos({ vendedor: sellersResu.data[0].id, endereco: '', numero: '' });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [navigate, pedidosData.produtos, totalCarrinho]);

  const realizarPedido = async () => {
    const user = getStorage('user');

    const objetoCompra = {
      sellerId: dadosPedido.vendedor,
      totalPrice: carrinho,
      deliveryAddress: dadosPedido.endereco,
      deliveryNumber: dadosPedido.numero,
      saleProducts: pedidosData.produtos.map((item) => ({ ...item, productId: item.id })),
    };

    try {
      const result = await axios.post('http://localhost:3001/api/sales', objetoCompra,
        { headers: { authorization: user.token } });
      navigate(`/customer/orders/${result.data.saleId}`);
      setCompraFinalizada(true);
    } catch (error) {
      console.log(error);
    }
  };

  const mapFinalizarPedidos = () => pedidosData.produtos
    .map((pedidos, index) => (<FinalizarPedidosCard
      key={ index }
      item={ index }
      { ...pedidos }
    />));

  const finalizarPainel = () => (
    <>
      <div className="finalizarPedidos">
        <h1>Finalizar Pedidos</h1>
        { (pedidosData.produtos.length > 0) && mapFinalizarPedidos() }
      </div>
      <div>
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          { carrinho.toFixed(2).toString().replace('.', ',') }
        </p>
      </div>
      <div>
        <select
          name="vendedor"
          onChange={ handleChange }
          data-testid="customer_checkout__select-seller"
        >
          { sellers.map((us, index) => (
            <option
              key={ index }
              value={ us.id }
            >
              {us.name}
            </option>))}
        </select>
        <input
          data-testid="customer_checkout__input-address"
          name="endereco"
          type="text"
          value={ dadosPedido.endereco }
          onChange={ handleChange }
        />
        <input
          data-testid="customer_checkout__input-addressNumber"
          name="numero"
          type="text"
          value={ dadosPedido.numero }
          onChange={ handleChange }
        />
        <button
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={ realizarPedido }
        >
          Finalizar Pedido
        </button>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      { (comparFinalizada) ? (
        <div>
          <h1> Compra realizada com sucesso ! </h1>
          <h2> O seu pedido foi enviado e esta sendo processado.</h2>
        </div>) : finalizarPainel() }
    </>
  );
}
