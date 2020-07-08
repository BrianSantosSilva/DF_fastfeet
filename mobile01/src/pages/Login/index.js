import React, { useState } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logoB.png';

import Background from '~/components/Background';

import { Container, Form, FormInput, SubmitButton } from './styles';
import { LoginRequest } from '~/store/modules/auth/actions';

export default function Login() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);

  const [id, setId] = useState('');

  function handleSubmit() {
    dispatch(LoginRequest(id));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="next"
            value={id}
            onChangeText={setId}
          />

          <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
