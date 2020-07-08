import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100%;
  background: #ffffff;
`;

export const Page = styled.View``;
export const Header = styled.View`
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0;

  left: 0;
  background: #7d40e7;
`;

export const CardContent = styled.View`
  margin: 15px;
  flex: 1;
  justify-content: center;
`;

export const Card1 = styled.View`
  margin: 25px;
  height: 200px;
  border-color: #0000001a;
  border-width: 1px;
  border-radius: 4px;
  background: #ffffff;
`;

export const Card2 = styled.View`
  margin: 0px 25px;
  height: 150px;
  border-color: #0000001a;
  border-width: 1px;
  border-radius: 4px;
  background: #ffffff;
`;
export const Card3 = styled.View`
  margin: 20px 25px;
  padding: 20px;
  border-color: #0000001a;
  border-width: 1px;
  border-radius: 4px;
  background: #0000001a;
`;

export const BoxContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BoxContentInternal = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoxContent3 = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Text1 = styled.Text`
  color: #7d40e7;
  font-size: 14px;
  margin-bottom: 10px;
`;
export const Text2 = styled.Text`
  color: #999999;
  font-size: 14px;
`;
export const Text3 = styled.Text`
  color: #666666;
  font-size: 14px;
  margin-bottom: 10px;
`;
