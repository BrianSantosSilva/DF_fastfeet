import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, BoxForm, BoxMensagem } from './styles';
import { Form, Input } from '@rocketseat/unform';

import Logo from '../../assets/images/logo.png';

import { signInRequest } from '../../store/modules/auth/actions';

import api from '../../services/api';

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [mostraMensagem, setMostraMensagem] = useState('');

  function handleSubmit(data) {
    let dados = {
      email: data.email,
      password: data.password,
    };
    if (!data.email) {
      setMostraMensagem('Informe o e-mail!');
      return;
    }
    if (!data.password) {
      setMostraMensagem('Informe a senha!');
      return;
    }

    dispatch(signInRequest(data.email, data.password));
  }
  return (
    <Container>
      <BoxForm>
        <img src={Logo} alt="FastFeet" />
        <Form onSubmit={handleSubmit}>
          {mostraMensagem.length > 0 && (
            <BoxMensagem>{mostraMensagem}</BoxMensagem>
          )}

          <label>SEU E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <label>SUA SENHA</label>
          <Input name="password" type="password" placeholder="********" />
          <button type="submit">Entrar no sistema{loading}</button>
        </Form>
      </BoxForm>
    </Container>
  );
}

export default Login;
