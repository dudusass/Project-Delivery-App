import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveStorage } from '../localStorage/localStorage';
import '../css/Login.css';

function Login() {
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => setInputs((prevState) => (
    { ...prevState, [name]: value }));

  async function handleClickLogin() {
    try {
      const returnRequest = await axios.post('http://localhost:3001/api/users/login', inputs);
      saveStorage('user', returnRequest.data);
      navigate('/customer/products');
    } catch (error) {
      setDisplayErrorMsg(true);
    }
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
          onClick={ () => navigate('/register') }
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

export default Login;
