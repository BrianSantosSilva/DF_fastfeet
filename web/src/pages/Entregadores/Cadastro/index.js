import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import {
  Container,
  Title,
  Boxtitle,
  BoxButton,
  BoxForm,
  BoxMensagem,
} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

import AvatarInput from '../AvatarInput';

function Cadastro() {
  let history = useHistory();
  const [mostraMensagem, setMostraMensagem] = useState('');

  async function gravarEntregador(data, { resetForm }) {
    let dados = {
      name: data.nome,
      avatar_id: data.avatar_id,
      email: data.email,
    };

    if (!data.nome) {
      setMostraMensagem('Preencher nome!');
      return;
    }
    if (!data.email) {
      setMostraMensagem('Preencher email!');
      return;
    }

    if (!data.avatar_id) {
      setMostraMensagem('Escolher uma imagem!');
      return;
    }

    try {
      const entregadoresData = await api.post('deliverymans', dados);
      if (entregadoresData.data.id) {
        setMostraMensagem('Cadastro efetuado com sucesso!');
        try {
          resetForm();
        } catch (error) {}
      } else {
        setMostraMensagem(entregadoresData.data.error);
      }
    } catch (error) {
      setMostraMensagem('Erro ao efetuar cadastro!');
    }
  }

  return (
    <Container>
      <Form onSubmit={gravarEntregador}>
        {mostraMensagem.length > 0 && (
          <BoxMensagem>{mostraMensagem}</BoxMensagem>
        )}
        <Boxtitle>
          <Title>Cadastro de entregadores</Title>
          <BoxButton>
            <button
              className="voltar"
              type="button"
              onClick={() => history.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> VOLTAR
            </button>
            <button className="salvar" type="submit">
              <FontAwesomeIcon icon={faCheck} /> SALVAR
            </button>
          </BoxButton>
        </Boxtitle>

        <BoxForm>
          <div className="boxFile">
            <AvatarInput name="avatar_id" />
          </div>

          <div className="inputs">
            <label>Nome</label>
            <Input name="nome" type="text" />
            <label>Email</label>
            <Input name="email" type="text" />
          </div>
        </BoxForm>
      </Form>
    </Container>
  );
}

export default Cadastro;
