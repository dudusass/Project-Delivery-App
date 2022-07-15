import React, { useEffect, useContext } from 'react';
import ContextProject from '../context';
import FinalizarPedidosCard from '../components/FinalizarPedidos/FinalizarPedidosCard';

export default function FinalizarPedido() {
  const { pedidosData, setPedidosData } = useContext(ContextProject);

  const mapFinalizarPedidos = () => pedidosData.produtos
    .map((pedidos, index) => (<FinalizarPedidosCard 
      key={index}
      item={index + 1}
      valorTotal={pedidosData.total}
      { ...pedidos }
    />));

  return (
    <div className="finalizarPedidos">
      <h1>Finalizar Pedidos</h1>
      { (pedidosData.produtos.length > 0) && mapFinalizarPedidos() }
    </div>
  );
}
