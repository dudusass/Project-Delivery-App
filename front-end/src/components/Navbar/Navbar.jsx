import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, removeStorage } from '../../localStorage/localStorage';
import '../../css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = getStorage('user');

  const btnSair = () => {
    removeStorage('user');
    navigate('/');
  };

  return (
    <nav className="separete-buttons">
      <div className="box">
        <button
          type="submit"
          className=" selected product-button buttons-adjust"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => navigate('/customer/products') }
        >
          PRODUTOS
        </button>
        <button
          type="button"
          className="request-button buttons-adjust"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => navigate('/customer/orders') }
        >
          MEUS PEDIDOS
        </button>
      </div>
      <div className="box">
        <button
          type="button"
          className="name-bar buttons-adjust"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
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
