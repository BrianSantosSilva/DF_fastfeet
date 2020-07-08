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

function Cadastro() {
  let history = useHistory();
  const [mostraMensagem, setMostraMensagem] = useState('');

  async function gravarDestinatario(data, { resetForm }) {
    let dados = {
      name: data.name,
      rua: data.rua,
      numero: data.numero,
      estado: data.estado,
      cidade: data.cidade,
      cep: data.cep,
      complemento: data.complemento,
    };

    if (!data.name) {
      setMostraMensagem('Preencher nome!');
      return;
    }
    if (!data.rua) {
      setMostraMensagem('Preencher rua!');
      return;
    }
    if (!data.numero) {
      setMostraMensagem('Preencher número!');
      return;
    }
    if (!data.cidade) {
      setMostraMensagem('Preencher cidade!');
      return;
    }
    if (!data.estado) {
      setMostraMensagem('Preencher estado!');
      return;
    }
    if (!data.cep) {
      setMostraMensagem('Preencher cep!');
      return;
    }

    try {
      const destinatariosData = await api.post('recipients', dados);

      resetForm();
      setMostraMensagem('Cadastro efetuado com sucesso!');
    } catch (error) {
      setMostraMensagem('Erro ao efetuar cadastro!');
    }
  }

  return (
    <Container>
      <Form onSubmit={gravarDestinatario}>
        {mostraMensagem.length > 0 && (
          <BoxMensagem>{mostraMensagem}</BoxMensagem>
        )}
        <Boxtitle>
          <Title>Cadastro de destinatário</Title>
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
          <div className="inputs">
            <div className="box1">
              <label>Nome</label>
              <Input name="name" type="text" />
            </div>
            <div className="box2">
              <div className="box21">
                <label>Rua</label>
                <Input name="rua" type="text" />
              </div>
              <div className="box22">
                <label>Número</label>
                <Input name="numero" type="text" />
              </div>
              <div className="box23">
                <label>Complemento</label>
                <Input name="complemento" type="text" />
              </div>
            </div>
            <div className="box3">
              <div className="box31">
                <label>Cidade</label>
                <Input name="cidade" type="text" />
              </div>
              <div className="box32">
                <label>Estado</label>
                <Input name="estado" type="text" />
              </div>
              <div className="box33">
                <label>CEP</label>
                <Input name="cep" type="text" />
              </div>
            </div>
          </div>
        </BoxForm>
      </Form>
    </Container>
  );
}

export default Cadastro;
