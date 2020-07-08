import React, { useState } from 'react';

import { Container, Box, BoxOpcoes, ListaOpcoes } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faEllipsisH,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import ModalVisualizar from '../ModalVisualizar';

export default function MenuOption({ problema, onChange }) {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleToggleVisibleModal() {
    setVisibleModal(!visibleModal);
  }

  return (
    <>
      <Container>
        <FontAwesomeIcon icon={faEllipsisH} onClick={handleToggleVisible} />
        <Box visible={visible}>
          <BoxOpcoes>
            <FontAwesomeIcon
              className="caretUp"
              icon={faCaretUp}
              onClick={handleToggleVisible}
            />
            <ListaOpcoes>
              <div onClick={handleToggleVisibleModal}>
                <FontAwesomeIcon className="pencil" icon={faPencilAlt} />
                <span>Visualizar</span>
              </div>
              <div>
                <FontAwesomeIcon
                  className="trash"
                  icon={faTrash}
                  onClick={() => onChange(problema.id)}
                />
                <span onClick={() => onChange(problema.id)}>
                  Cancelar encomenda
                </span>
              </div>
            </ListaOpcoes>
          </BoxOpcoes>
        </Box>
      </Container>
      <ModalVisualizar visible={visibleModal} problema={problema} />
    </>
  );
}
