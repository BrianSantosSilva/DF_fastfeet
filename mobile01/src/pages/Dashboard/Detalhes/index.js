import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import {
  Container,
  Page,
  Header,
  Card1,
  Card2,
  Card3,
  CardContent,
  BoxContent,
  BoxContent3,
  BoxContentInternal,
  Text1,
  Text2,
  Text3,
} from './styles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../../../services/api';

export default function Detalhes({ navigation }) {
  const entrega = navigation.getParam('id');

  const [encomendasData, setEncomendasData] = useState();

  function direcionaRota(rota) {
    if (
      encomendasData.end_date &&
      (rota === 'InfProblema' || rota === 'ConfEntrega')
    ) {
      alert('Essa encomenda já foi entregue!');
      return false;
    }
    navigation.navigate(rota, { id: entrega });
  }

  async function fetchData() {
    let urlED = `deliverys/${entrega}`;

    const encomendasData = await api.get(urlED, {});

    setEncomendasData(encomendasData.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {encomendasData ? (
        <Page>
          <Header></Header>
          <Card1>
            <CardContent>
              <Text1>Informações da entrega</Text1>
              <Text2>DESTINATÁRIO</Text2>

              <Text3>{encomendasData.Recipients.name}</Text3>
              <Text2>ENDEREÇO DE ENTREGA</Text2>
              <Text3>
                {encomendasData.Recipients.rua},{' '}
                {encomendasData.Recipients.numero},{' '}
                {encomendasData.Recipients.cidade} -{' '}
                {encomendasData.Recipients.estado},{' '}
                {encomendasData.Recipients.cep}
              </Text3>
              <Text2>PRODUTO</Text2>
              <Text3>{encomendasData.product}</Text3>
            </CardContent>
          </Card1>
          <Card2>
            <CardContent>
              <Text1>Situação da entrega</Text1>
              <Text2>STATUS</Text2>
              <Text3>Pendente</Text3>
              <BoxContent>
                <View>
                  <Text2>DATA DE RETIRADA</Text2>
                  <Text3>
                    {encomendasData.start_date &&
                      moment(encomendasData.start_date).format('DD/MM/YYYY')}
                  </Text3>
                </View>
                <View>
                  <Text2>DATA DE ENTREGA</Text2>
                  <Text3>
                    {encomendasData.end_date &&
                      moment(encomendasData.end_date).format('DD/MM/YYYY')}
                  </Text3>
                </View>
              </BoxContent>
            </CardContent>
          </Card2>

          <Card3>
            <BoxContent3>
              <TouchableOpacity onPress={() => direcionaRota('InfProblema')}>
                <BoxContentInternal>
                  <Icon name="highlight-off" size={30} color="#E74040" />
                  <Text2>Informar</Text2>
                  <Text2>problema</Text2>
                </BoxContentInternal>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => direcionaRota('VisProblema')}>
                <BoxContentInternal>
                  <Icon name="report-problem" size={30} color="#E7BA40" />
                  <Text2>Visualizar</Text2>
                  <Text2>Problemas</Text2>
                </BoxContentInternal>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => direcionaRota('ConfEntrega')}>
                <BoxContentInternal>
                  <Icon name="check-circle" size={30} color="#7D40E7" />
                  <Text2>Confirmar</Text2>
                  <Text2>Entrega</Text2>
                </BoxContentInternal>
              </TouchableOpacity>
            </BoxContent3>
          </Card3>
        </Page>
      ) : (
        <Text>Detalhes</Text>
      )}
    </Container>
  );
}
