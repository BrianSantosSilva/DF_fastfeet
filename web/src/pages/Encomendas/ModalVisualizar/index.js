import React, { useState, useEffect, useMemo } from 'react';

import { Container, FlexDiv } from './styles';

import Assinatura from '../../../assets/images/assinaturaBase.png';

export default function ModalVisualizar({ visible, encomenda }) {
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
                <b>Informações da encomenda</b>
              </span>
              <span>
                {encomenda.Recipients ? encomenda.Recipients.rua : '-'},{' '}
                {encomenda.Recipients ? encomenda.Recipients.numero : '-'}
              </span>
              <span>
                {encomenda.Recipients ? encomenda.Recipients.cidade : '-'} -{' '}
                {encomenda.Recipients ? encomenda.Recipients.estado : '-'}
              </span>
              <span>
                {encomenda.Recipients ? encomenda.Recipients.cep : '-'}
              </span>
            </div>
            <div className="datasModal">
              <span>
                <b>Datas</b>
              </span>

              <span>
                <b>Retirada:</b>{' '}
                {encomenda.start_date ? encomenda.start_date : '-'}
              </span>
              <span>
                <b>Entrega:</b>
                {encomenda.end_date ? encomenda.end_date : '-'}
              </span>

              {encomenda.canceled_at && (
                <span>
                  <b>Cancelada:</b>
                  {encomenda.canceled_at}
                </span>
              )}
            </div>
            <div>
              <span>
                <b>Assinatura do destinatário</b>
              </span>
              <span className="imgbox">
                <img src={Assinatura} alt="Assinatura" />
              </span>
            </div>
          </FlexDiv>
        </div>
      </div>
    </Container>
  );
}
