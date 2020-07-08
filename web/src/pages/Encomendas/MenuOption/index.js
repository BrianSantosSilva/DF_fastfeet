import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, BoxOpcoes, ListaOpcoes } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faEllipsisH,
  faEye,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import ModalVisualizar from '../ModalVisualizar';

export default function MenuOption({ encomenda, onChange }) {
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
                <FontAwesomeIcon className="eye" icon={faEye} />
                <span>Visualizar</span>
              </div>
              <Link to={`/encomendas/alteracao/${encomenda.id}`}>
                <div>
                  <FontAwesomeIcon className="pencil" icon={faPencilAlt} />
                  <span>Editar</span>
                </div>
              </Link>
              <div>
                <FontAwesomeIcon
                  onClick={() => onChange(encomenda.id)}
                  className="trash"
                  icon={faTrash}
                />
                <span onClick={() => onChange(encomenda.id)}>Excluir</span>
              </div>
            </ListaOpcoes>
          </BoxOpcoes>
        </Box>
      </Container>
      <ModalVisualizar visible={visibleModal} encomenda={encomenda} />
    </>
  );
}
