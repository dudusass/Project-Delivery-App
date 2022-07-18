import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [displayErrorMsg, setDisplayErrorMsg] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  function handleChange({ target }) {
    const { name, value } = target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleClickRegister(e) {
    e.preventDefault();
    try {
      const returnRequest = await axios.post('http://localhost:3001/api/users/register', inputs);
      navigate('/login');
    } catch (error) {
      setDisplayErrorMsg(true);
    }
  }

  function enableButton() {
    const { name, email, password } = inputs;
    const minName = 12;
    const minPassword = 6;
    if (password.length >= minPassword && name.length >= minName) {
      const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
      if (regex.test(email)) return false;
    }
    return true;
  }

  return (
    <div>
      <form className="registerForm">
        <label htmlFor="Nome">
          <h3>Nome</h3>
          <input
            type="text"
            id="text"
            name="name"
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            value={ inputs.nome }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          <h3>Email</h3>
          <input
            type="email"
            id="email"
            name="email"
            data-testid="common_register__input-email"
            placeholder="seu-email@trybeer.com.br"
            value={ inputs.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <h3>Senha</h3>
          <input
            type="password"
            id="password"
            name="password"
            data-testid="common_register__input-password"
            placeholder="***********"
            value={ inputs.password }
            onChange={ handleChange }
          />
        </label>
        <button
          className="registerButton"
          disabled={ enableButton() }
          onClick={ handleClickRegister }
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
        {
          displayErrorMsg && (
            <p data-testid="common_register__element-invalid_register">
              Usuário já cadastrado !
            </p>
          )
        }
      </form>
    </div>
  );
}

export default Register;
