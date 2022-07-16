import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';

import Login from './pages/Login';
import MeusPedidos from './pages/MeusPedidos';
import Produtos from './pages/Produtos';
import FinalizarPedido from './pages/FinalizarPedido';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact element={ <Login /> } path="/" />
        <Route element={ <Produtos /> } path="/customer/products" />
        <Route element={ <MeusPedidos /> } path="/customer/orders" />
        <Route element={ <FinalizarPedido /> } path="/customer/checkout" />
      </Switch>
    </Provider>
  );
}

export default App;
