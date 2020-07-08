import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 0 30px;
`;
export const BoxImage = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  margin-bottom: 20px;
`;

export const TextBase1 = styled.Text`
  color: #666666;
  font-size: 14px;
`;

export const TextBase2 = styled.Text`
  color: #444444;
  font-size: 24px;
  margin-bottom: 10px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 5px;
  width: 100%;
  background: #e74040;
`;
