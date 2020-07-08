import styled from 'styled-components';

export const Container = styled.div``;

export const Box = styled.div`
  background: none;
  border: 0;
  position: relative;
  display: ${(props) => (props.visible ? 'block' : 'none!important')};
`;

export const BoxOpcoes = styled.div`
  position: absolute;
  width: 150px;
  height: 90px;
  left: calc(50% - 82px);
  top: calc(100% + 10px);
  background: #ffffff;
  border-radius: 4px;
  padding: 15px 5px;
  border: 1px solid #00000026;
  svg.caretUp {
    top: -12px;
    position: absolute;
  }
  svg.eye {
    color: #8e5be8;
    float: left;
  }
  svg.pencil {
    color: #4d85ee;
  }
  svg.trash {
    color: #de3b3b;
  }
  svg {
    min-width: 25px;
  }
`;
export const ListaOpcoes = styled.div`
  display: flex;
  flex-direction: column;
  div {
    height: 40px;
    font-size: 14px;
    color: #999999 !important;
    width: 130px;
    display: flex;
    flex-direction: row;
    justify-content: left !important;
  }
  span {
    cursor: pointer;
  }
  div:nth-child(even) {
    border-top: 1px solid #00000026;
  }
`;
