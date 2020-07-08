import React, { useState, useEffect, useMemo } from 'react';

import { Container, FlexDiv } from './styles';

import Assinatura from '../../../assets/images/assinaturaBase.png';

export default function ModalVisualizar({ visible, problema }) {
  const [visibleModal, setVisibleModal] = useState();

  function closeModal() {
    setVisibleModal(false);
  }

  useMemo(() => {
    setVisibleModal(visible);
  }, [visible]);

  return (
    <Container visible={visibleModal}>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={closeModal}>
            &times;
          </span>
          <FlexDiv>
            <div>
              <span>
                <b>Visualizar problema</b>
              </span>
              <span>{problema.description}</span>
            </div>
          </FlexDiv>
        </div>
      </div>
    </Container>
  );
}
