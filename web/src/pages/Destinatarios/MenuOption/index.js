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

export default function MenuOption({ idDestinatario, onChange }) {
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
            <Link to={`/destinatarios/alteracao/${idDestinatario}`}>
              <div>
                <FontAwesomeIcon className="pencil" icon={faPencilAlt} />
                <span>Editar</span>
              </div>
            </Link>
            <div>
              <FontAwesomeIcon
                onClick={() => onChange(idDestinatario)}
                className="trash"
                icon={faTrash}
              />
              <span onClick={() => onChange(idDestinatario)}>Excluir</span>
            </div>
          </ListaOpcoes>
        </BoxOpcoes>
      </Box>
    </Container>
  );
}
