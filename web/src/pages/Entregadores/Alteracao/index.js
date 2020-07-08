import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router';
import api from '../../../services/api';
import AvatarInput from '../AvatarInput';

function Alteracao() {
  const [alteracaoData, setAlteracaoData] = useState({
    name: '',
    email: '',
  });
  let history = useHistory();
  const [mostraMensagem, setMostraMensagem] = useState('');
  let { id } = useParams();

  async function loadData(data) {
    let urlED = 'deliverymans';
    if (id) {
      urlED = urlED + '/' + id;
    }

    const entregadoresData = await api.get(urlED, {});

    setAlteracaoData(entregadoresData.data);
  }

  async function alterarEntregador(data) {
    let dados = {
      name: data.name,
      avatar_id: data.avatar_id ? data.avatar_id : alteracaoData.avatar_id,
      email: data.email,
    };

    if (!data.name) {
      setMostraMensagem('Preencher nome!');
      return;
    }
    if (!data.email) {
      setMostraMensagem('Preencher email!');
      return;
    }

    if (!data.avatar_id && !alteracaoData.avatar_id) {
      setMostraMensagem('Escolher uma imagem!');
      return;
    }

    try {
      const entregadoresData = await api.put(`deliverymans/${id}`, dados);
      if (entregadoresData.data.id) {
        setMostraMensagem('Alteração efetuado com sucesso!');
      } else {
        setMostraMensagem(entregadoresData.data.error);
      }
    } catch (error) {
      setMostraMensagem('Erro ao efetuar alteração!');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Form onSubmit={alterarEntregador}>
        {mostraMensagem.length > 0 && (
          <BoxMensagem>{mostraMensagem}</BoxMensagem>
        )}
        <Boxtitle>
          <Title>Edição de entregadores</Title>
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
            <AvatarInput name="avatar_id" avatarInicial={alteracaoData.File} />
          </div>
          <div className="inputs">
            <label>Nome</label>
            <Input
              name="name"
              type="text"
              value={alteracaoData.name}
              onChange={(e) => {
                setAlteracaoData({
                  ...alteracaoData,
                  name: e.target.value,
                });
              }}
            />
            <label>Email</label>
            <Input
              name="email"
              type="text"
              value={alteracaoData.email}
              onChange={(e) => {
                setAlteracaoData({
                  ...alteracaoData,
                  email: e.target.value,
                });
              }}
            />
          </div>
        </BoxForm>
      </Form>
    </Container>
  );
}

export default Alteracao;
