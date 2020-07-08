import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Image } from 'react-native';

import {
  Container,
  TextBase1,
  TextBase2,
  BoxImage,
  SubmitButton,
} from './styles';

import moment from 'moment';

import { truncText, replaceURLAPI } from '../../functions/global';

import { signOut } from '~/store/modules/auth/actions';

import api from '../../services/api';

export default function Perfil() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.user);

  const urlAxios = api.defaults.baseURL;

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <BoxImage>
        <Image
          style={{ width: 200, height: 200, borderRadius: 100, margin: 'auto' }}
          source={{
            uri: profile.avatar
              ? replaceURLAPI(profile.path, urlAxios)
              : 'https://api.adorable.io/avatars/50/1ab32ott@adorable.png',
          }}
        />
      </BoxImage>
      <TextBase1>Nome Completo</TextBase1>
      <TextBase2>{profile.name}</TextBase2>
      <TextBase1>Email</TextBase1>
      <TextBase2>{profile.email}</TextBase2>
      <TextBase1>Data de cadastro</TextBase1>
      <TextBase2> {moment(profile.createdAt).format('DD/MM/YYYY')}</TextBase2>

      <SubmitButton onPress={handleLogout}>Logout</SubmitButton>
    </Container>
  );
}
