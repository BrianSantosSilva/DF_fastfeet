import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, BoxOpcoes, ListaOpcoes } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faEllipsisH,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

export default function MenuOption({ idEntregador, onChange }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    setVisible(!visible);
  }
  return (
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
            <Link to={`/entregadores/alteracao/${idEntregador}`}>
              <div>
                <FontAwesomeIcon className="pencil" icon={faPencilAlt} />
                <span>Editar</span>
              </div>
            </Link>
            <div>
              <FontAwesomeIcon
                onClick={() => onChange(idEntregador)}
                className="trash"
                icon={faTrash}
              />
              <span onClick={() => onChange(idEntregador)}>Excluir</span>
            </div>
          </ListaOpcoes>
        </BoxOpcoes>
      </Box>
    </Container>
  );
}
