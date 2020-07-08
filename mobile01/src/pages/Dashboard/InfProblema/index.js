import React, { useRef, useState } from 'react';
import { View, Alert } from 'react-native';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  Page,
  Header,
} from './styles';

import api from '../../../services/api';

export default function InfProblema({ navigation }) {
  const entrega = navigation.getParam('id');
  const [text, setText] = useState('');

  async function handleProblema() {
    let urlED = `delivery/${entrega}/problems`;

    try {
      const encomendasData = await api.post(urlED, {
        description: text,
      });

      alert('Problema reportado!');

      navigation.navigate('Dashboard');
    } catch (error) {
      alert('Erro ao notificar problema tente mais tarde!');
    }
  }

  return (
    <Container>
      <Header></Header>
      <Page>
        <FormInput
          icon="person"
          autoCorrect={false}
          multiline={true}
          numberOfLines={4}
          style={{ height: 250 }}
          autoCapitalize="none"
          placeholder="Informe o problema que ocorreu na entrega!"
          value={text}
          onChangeText={setText}
        />

        <SubmitButton onPress={handleProblema}>Enviar</SubmitButton>
      </Page>
    </Container>
  );
}
