import styled from 'styled-components';

export const Container = styled.div`
  .modal {
    display: ${(props) =>
      props.visible ? 'block!important' : 'none!important'};
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    background-color: #fefefe;
    margin: 10% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 450px; /* Could be more or less, depending on screen size */
    height: 350px;
  }

  /* The Close Button */
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    right: calc(34%);
    top: calc(21%);
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;

  .datasModal {
    border-top: 1px solid #00000033;
    border-bottom: 1px solid #00000033;
  }

  .imgbox {
    width: 100%;
  }

  div {
    display: flex;
    flex-direction: column;
    color: #444444 !important;
    width: 100%;
    align-items: baseline !important;
    padding-bottom: 20px;
    padding-top: 20px;
    span {
      padding-bottom: 2px;
      img {
        width: 234px !important;
        height: 60px !important;
        display: block;
        margin: auto;
      }
    }
  }
`;
