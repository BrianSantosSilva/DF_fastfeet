import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

import {
  Container,
  Card1,
  CardContent,
  Text1,
  Text2,
  Text3,
  Page,
  Header,
  HeaderText,
} from './styles';

import { truncText } from '../../../functions/global';

import api from '../../../services/api';

export default function VisProblema({ navigation }) {
  const entrega = navigation.getParam('id');
  const [encomendasData, setEncomendasData] = useState([]);

  async function fetchData() {
    let urlED = `delivery/${entrega}/problems`;

    const encomendasData = await api.get(urlED, {});

    setEncomendasData(encomendasData.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderText>Encomenda {entrega}</HeaderText>
      </Header>
      <Page>
        {encomendasData.map((item) => (
          <Card1>
            <CardContent>
              <Text2>{truncText(item.description, 15)}</Text2>
              <Text3>14/01/2020</Text3>
            </CardContent>
          </Card1>
        ))}
      </Page>
    </Container>
  );
}
