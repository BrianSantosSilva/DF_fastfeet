import styled from 'styled-components';
import search from '../../assets/images/search.png';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  display: flex;

  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 24px;
  color: #444444;
  font-weight: bold;
`;

export const BoxForm = styled.div`
  table {
    width: 1200px;

    font-size: 16px;
    border-collapse: separate;
    border-spacing: 0 17px;

    th {
      text-align: left;
      color: #444444;
      padding: 10px 10px 0px 10px;
    }

    th:last-child {
      text-align: center;
    }

    td {
      padding: 10px;
      height: 57px;
      color: #666666;
      background: #ffffff;

      button {
        min-width: 99px;
        height: 25px;
        border-radius: 12px;
        border: 0px;
        display: flex;

        align-items: center;
        justify-content: center;
        svg {
          font-size: 10px;
          margin-right: 5px;
        }
      }

      div {
        display: flex;
        align-items: center;
        img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
        span {
          margin-left: 5px;
        }
      }
    }
    td:last-child {
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #c6c6c6;
        svg {
          &:hover {
            cursor: pointer;
            color: ${darken(0.23, '#c6c6c6')};
          }
        }
      }
    }
  }
`;

export const BetweenTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  button {
    background: #7d40e7;
    color: #fff;
    border: 0;
    width: 142px;
    height: 36px;
    border-radius: 4px;

    transition: background 0.2s;
    &:hover {
      background: ${darken(0.03, '#7D40E7')};
    }
  }
  input {
    background: url(${search}) #ffffff 5% 50% no-repeat padding-box;
    background-size: 16px 16px;

    width: 237px;
    margin-top: 30px;
    height: 36px;
    border-radius: 2px;
    border: 1px solid #dddddd;
    padding: 4px 4px 4px 30px;
    font-size: 14px;
    color: #999999;
  }
`;
