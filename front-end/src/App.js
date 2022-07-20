import React from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';

import Login from './pages/Login';
import Register from './pages/Register';
import MeusPedidos from './pages/MeusPedidos';
import Produtos from './pages/Produtos';
import FinalizarPedido from './pages/FinalizarPedido';
import PedidoDetalhes from './pages/PedidoDetalhes';

function App() {
  return (
    <Provider>
      <Switch>
        <Route element={ <PedidoDetalhes /> } path="/customer/orders/:id" />
        <Route exact element={ <Navigate to="/login" /> } path="/" />
        <Route element={ <Login /> } path="/login" />
        <Route element={ <Register /> } path="/register" />
        <Route element={ <Produtos /> } path="/customer/products" />
        <Route element={ <MeusPedidos /> } path="/customer/orders" />
        <Route element={ <FinalizarPedido /> } path="/customer/checkout" />
      </Switch>
    </Provider>
  );
}

export default App;
