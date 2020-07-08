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

export const HeaderText = styled.Text`
  color: #ffffff;
  margin-top: 20px;
  font-size: 20px;
`;

export const Page = styled.View`
  margin: 25px;
  margin-top: 70px;
  border-radius: 4px;
`;
export const Header = styled.View`
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;

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

export const Card1 = styled.View`
  height: 70px;
  border-color: #0000001a;
  border-width: 1px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
`;

export const CardContent = styled.View`
  margin: 15px;
  flex: 1;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Text1 = styled.Text`
  color: #7d40e7;
  font-size: 14px;
`;
export const Text2 = styled.Text`
  color: #999999;
  font-size: 14px;
`;
export const Text3 = styled.Text`
  color: #c1c1c1;
  font-size: 14px;
`;
