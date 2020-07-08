import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import moment from 'moment';
import {
  Container,
  BoxHeader,
  BoxImage,
  BoxName,
  BoxSair,
  BoxFilter,
  BoxFilter2,
  BoxCard,
  Card,
  CardH1,
  CardH2,
  CardP1,
  CardP1T1,
  CardP2,
  CardP2B1,
  CardP2B2,
  CardP2B3,
  CardP2T1,
  CardP3,
  CardP3B1,
  CardP3T1,
  CardP3T2,
  CardP3T3,
  Text1,
  Text2,
  Text3,
  Text4,
  Text5,
} from './styles';
import { signOut } from '~/store/modules/auth/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { truncText, replaceURLAPI } from '../../functions/global';

import api from '../../services/api';

export default function Dashboard({ isFocused, navigation }) {
  const [encomendasData, setEncomendasData] = useState();
  const [menuEntregasData, setMenuEntregasData] = useState(1);

  const urlAxios = api.defaults.baseURL;

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.user);

  if (!profile) {
    dispatch(signOut());
  }

  function verDetalhes(item) {
    navigation.navigate('Detalhes', item);
  }

  function handleLogout() {
    dispatch(signOut());
  }

  async function pendentes() {
    let urlED = `deliverymans/${profile.id}/deliverys/pending`;

    const encomendasData = await api.get(urlED, {});

    setEncomendasData(encomendasData.data);
    setMenuEntregasData(1);
  }
  async function entregues() {
    let urlED = `deliverymans/${profile.id}/deliverys/delivered`;

    const encomendasData = await api.get(urlED, {});

    setEncomendasData(encomendasData.data);
    setMenuEntregasData(2);
  }

  async function fetchData() {
    let urlED = `deliverymans/${profile.id}/deliverys/pending`;

    const encomendasData = await api.get(urlED, {});

    setEncomendasData(encomendasData.data);
  }
  useEffect(() => {
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <BoxHeader>
        <BoxImage>
          <Image
            style={{ width: 70, height: 70, borderRadius: 35, marginRight: 10 }}
            source={{
              uri: profile
                ? replaceURLAPI(profile.path, urlAxios)
                : 'https://api.adorable.io/avatars/50/1ab32ott@adorable.png',
            }}
          />
        </BoxImage>
        <BoxName>
          <Text1>Bem vindo de volta,</Text1>
          <Text2>{truncText(profile.name, 18)}</Text2>
        </BoxName>
        <BoxSair>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="exit-to-app" size={30} color="#E74040" />
          </TouchableOpacity>
        </BoxSair>
      </BoxHeader>
      <BoxFilter>
        <Text3>Entregas</Text3>
        <BoxFilter2>
          <TouchableOpacity onPress={pendentes}>
            {menuEntregasData === 1 ? (
              <Text4>Pendentes</Text4>
            ) : (
              <Text5>Pendentes</Text5>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={entregues}>
            {menuEntregasData === 2 ? (
              <Text4>Entregues</Text4>
            ) : (
              <Text5>Entregues</Text5>
            )}
          </TouchableOpacity>
        </BoxFilter2>
      </BoxFilter>
      <BoxCard>
        {encomendasData ? (
          <FlatList
            data={encomendasData}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Card key={item.id}>
                <CardH1>
                  <CardP1>
                    <Icon name="local-shipping" size={30} color="#7D40E7" />
                    <CardP1T1>Encomenda {item.id}</CardP1T1>
                  </CardP1>
                  <CardP2>
                    <CardP2B1>
                      <Icon name="lens" size={20} color="#7D40E7" />
                      <CardP2T1>Aguardando </CardP2T1>
                      <CardP2T1>Retirada</CardP2T1>
                    </CardP2B1>
                    <CardP2B2>
                      {item.start_date ? (
                        <Icon name="lens" size={20} color="#7D40E7" />
                      ) : (
                        <Icon
                          name="radio-button-unchecked"
                          size={20}
                          color="#7D40E7"
                        />
                      )}
                      <CardP2T1>Retirada</CardP2T1>
                    </CardP2B2>
                    <CardP2B3>
                      {item.end_date ? (
                        <Icon name="lens" size={20} color="#7D40E7" />
                      ) : (
                        <Icon
                          name="radio-button-unchecked"
                          size={20}
                          color="#7D40E7"
                        />
                      )}

                      <CardP2T1>Entregue</CardP2T1>
                    </CardP2B3>
                  </CardP2>
                </CardH1>
                <CardH2>
                  <CardP3>
                    <CardP3B1>
                      <CardP3T1>Data </CardP3T1>
                      <CardP3T2>
                        {moment(item.createdAt).format('DD/MM/YYYY')}
                      </CardP3T2>
                    </CardP3B1>
                    <CardP3B1>
                      <CardP3T1>Cidade </CardP3T1>
                      <CardP3T2>{item.Recipients.cidade}</CardP3T2>
                    </CardP3B1>
                    <CardP3B1>
                      <CardP3T1> </CardP3T1>
                      <TouchableOpacity onPress={() => verDetalhes(item)}>
                        <CardP3T3>Ver detalhes</CardP3T3>
                      </TouchableOpacity>
                    </CardP3B1>
                  </CardP3>
                </CardH2>
              </Card>
            )}
          />
        ) : (
          <Text>Nenhuma enconmenda vinculada</Text>
        )}
      </BoxCard>
    </Container>
  );
}
