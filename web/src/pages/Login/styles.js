import styled from 'styled-components';

import { darken } from 'polished';

export const Container = styled.div`
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const BoxForm = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 30px;
  height: 425px;
  width: 360px;

  img {
    margin: 20px;
  }

  label {
    font-size: 14px;
    text-align: left;
    display: flex;
    color: #444444;
    margin: 10px 0px;
    font-weight: bold;
  }

  input {
    width: 300px;
    height: 45px;
    border-radius: 2px;
    border: 1px solid #dddddd;
    padding: 4px 4px 4px 4px;
    font-size: 16px;
    color: #999999;
  }

  button {
    background: #7d40e7;
    color: #fff;
    border: 0;
    width: 300px;
    height: 45px;
    margin: 15px 0px;
    border-radius: 4px;
    font-weight: bold;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.03, '#7D40E7')};
    }
  }
`;
export const BoxMensagem = styled.div`
  color: #de3b3b;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
`;
