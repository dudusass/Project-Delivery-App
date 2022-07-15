import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import './App.css';
import Provider from './context/Provider';

import Login from './pages/Login';
import Register from './pages/Register';
import MeusPedidos from './pages/MeusPedidos';
import Produtos from './pages/Produtos';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact element={ <Login /> } path="/" />
        <Route exact element={ <Register /> } path="/" />
        <Route element={ <Produtos /> } path="/produtos" />
        <Route element={ <MeusPedidos /> } path="/meuspedidos" />
      </Switch>
    </Provider>
  );
}

export default App;
