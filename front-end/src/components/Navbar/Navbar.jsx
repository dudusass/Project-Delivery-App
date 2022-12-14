import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, removeStorage } from '../../localStorage/localStorage';
import '../../css/Navbar.css';

function Navbar() {
  const [usuario, setUser] = useState([]);
  const navigate = useNavigate();

  const btnSair = () => {
    removeStorage('user');
    navigate('/');
  };

  useEffect(() => {
    setUser(getStorage('user'));
  }, []);

  const handleLink = () => {
    if (user) {
      if (usuario.role === 'seller') navigate('/seller/orders');
      if (usuario.role === 'customer') navigate('/customer/products');
    }
  };

  return (
    <nav className="separete-buttons">
      <div className="box">
        <button
          type="submit"
          className=" selected product-button buttons-adjust"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ handleLink }
        >
          { (usuario) && (usuario.role === 'seller') ? 'PEDIDOS' : 'PRODUTOS'}
        </button>
        { (usuario) && (usuario.role === 'customer') && (
          <button
            type="button"
            className="request-button buttons-adjust"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate('/customer/orders') }
          >
            MEUS PEDIDOS
          </button>)}
      </div>
      <div className="box">
        <button
          type="button"
          className="name-bar buttons-adjust"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { usuario.name }
        </button>
        <button
          type="button"
          className="exit-button buttons-adjust"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => btnSair() }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
