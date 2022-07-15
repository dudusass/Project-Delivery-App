import React, { useState } from 'react';
import PropTypes from 'prop-types';
import request from '../utils/request';
import '../css/Login.css';

function Login(props) {
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    const { name, value } = target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleClickLogin() {
    const { history } = props;
    const { email, password } = inputs;
    const url = 'http://localhost:3001/login';
    const method = 'POST';
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    const body = {
      email,
      password,
    };

    const returnRequest = await request(url, method, headers, JSON.stringify(body));
    console.log(returnRequest);

    if (returnRequest.message) {
      setDisplayErrorMsg(true);
    } else {
      history.push('/customer/products');
    }
  }

  function handleClickRegister() {
    const { history } = props;

    history.push('/register');
  }

  function enableButton() {
    const { email, password } = inputs;
    const minPassword = 6;
    if (password.length >= minPassword) {
      const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
      if (regex.test(email)) return false;
    }
    return true;
  }

  return (
    <div>
      <form>
        <label htmlFor="email">
          Login:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="common_login__input-email"
            placeholder="email@trybeer.com.br"
            value={ inputs.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            id="password"
            name="password"
            data-testid="common_login__input-password"
            placeholder="***********"
            value={ inputs.password }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ enableButton() }
          onClick={ handleClickLogin }
          data-testid="common_login__button-login"
        >
          LOGIN
        </button>
        <button
          type="button"
          onClick={ handleClickRegister }
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
        {
          displayErrorMsg && (
            <p data-testid="common_login__element-invalid-email">
              Usuário ou Senha inválidos
            </p>
          )
        }
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.node.isRequired,
};

export default Login;
