import { Platform } from 'react-native';

import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100%;
  background: #ffffff;
`;

export const Page = styled.View`
  margin: 25px;

  border-radius: 4px;
  background: #ffffff;
`;
export const Header = styled.View`
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0;

  left: 0;
  background: #7d40e7;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #0000001a;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #7d40e7;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
