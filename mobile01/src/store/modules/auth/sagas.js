import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';

import api from '../../../services/api';
import { LoginSuccess, LoginFailure } from './actions';
import { updateProfileSuccess } from '../user/actions';

export function* Login({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'sessions', { id });

    const { token, user } = response.data;

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(LoginSuccess(token, user));
    } else {
      Alert.alert(
        'Falha na autenticação',
        'Houve um erro no login, verifique id'
      );
      yield put(LoginFailure());
    }
    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique id'
    );
    yield put(LoginFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', Login),
]);
