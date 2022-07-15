import React from 'react';
import '../../css/Navbar.css';

function Navbar() {
  return (
    <nav className="separete-buttons">
      <div className="box">
        <button
          type="button"
          className=" selected product-button buttons-adjust"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </button>
        <button
          type="button"
          className="request-button buttons-adjust"
          data-testid="customer_products__element-navbar-link-orders"
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
          Nome Usuário
        </button>
        <button
          type="button"
          className="exit-button buttons-adjust"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
