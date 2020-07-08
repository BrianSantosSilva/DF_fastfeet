import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #dddddd;
`;

export const Content = styled.div`
  height: 64px;

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      width: 135px;
    }

    a {
      font-weight: bold;
      font-size: 14px;
      margin-left: 20px;
      color: #999999;

      &:hover {
        color: ${darken(0.4, '#999999')};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;
    label {
      font-size: 14px;
      font-weight: 400;
      color: #de3b3b;
      cursor: pointer;
    }
    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      font-weight: bold;
      color: #666666;
    }
  }
`;
