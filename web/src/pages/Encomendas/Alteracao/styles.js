import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
`;

export const Boxtitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button.voltar,
  button.salvar {
    border: 0;
    width: 142px;
    height: 36px;
    border-radius: 4px;
    transition: background 0.2s;
  }

  button.voltar {
    background: #cccccc;
    color: #fff;
    margin-right: 20px;

    &:hover {
      background: ${darken(0.03, '#cccccc')};
    }
  }
  button.salvar {
    background: #7d40e7;
    color: #fff;

    &:hover {
      background: ${darken(0.03, '#7D40E7')};
    }
  }
`;

export const BoxButton = styled.div``;

export const BoxForm = styled.div`
  width: 900px;
  height: 200px;
  background: #ffffff;
  margin-top: 20px;

  .box1 {
    display: flex;
    flex-direction: row;
  }

  .box2 {
    display: flex;
    flex-direction: column;
  }

  .box11,
  .box12 {
    display: flex;
    flex-direction: column;
  }
  .box11 {
    width: 405px;
    margin-right: 10px;
    margin-bottom: 15px;
  }

  .box12 {
    flex: 1;
  }

  div.inputs {
    display: flex;
    flex-direction: column;
    padding: 20px;

    label {
      font-weight: bold;
      margin-bottom: 5px;
    }

    input {
      margin-bottom: 15px;
      height: 45px;
      border: 1px solid #dddddd;
      border-radius: 4px;
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
export const Title = styled.div`
  font-size: 24px;
  color: #444444;
  font-weight: bold;
`;
