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

function Alteracao() {
  const [alteracaoData, setAlteracaoData] = useState({
    name: '',
    rua: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    cep: '',
  });

  let history = useHistory();
  const [mostraMensagem, setMostraMensagem] = useState('');
  let { id } = useParams();

  async function loadData(data) {
    let urlED = 'recipients';
    if (id) {
      urlED = urlED + '/' + id;
    }

    const destinatariosData = await api.get(urlED, {});

    setAlteracaoData(destinatariosData.data);
  }

  async function alterarDestinatario(data) {
    let dados = {
      name: data.name,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
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
      const destinatariosData = await api.put(`recipients/${id}`, dados);

      setMostraMensagem('Alteração efetuado com sucesso!');
    } catch (error) {
      setMostraMensagem('Erro ao efetuar alteração!');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Form onSubmit={alterarDestinatario}>
        {mostraMensagem.length > 0 && (
          <BoxMensagem>{mostraMensagem}</BoxMensagem>
        )}
        <Boxtitle>
          <Title>Edição de destinatário</Title>
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
            </div>
            <div className="box2">
              <div className="box21">
                <label>Rua</label>
                <Input
                  name="rua"
                  type="text"
                  value={alteracaoData.rua}
                  onChange={(e) => {
                    setAlteracaoData({
                      ...alteracaoData,
                      rua: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="box22">
                <label>Número</label>
                <Input
                  name="numero"
                  type="text"
                  value={alteracaoData.numero}
                  onChange={(e) => {
                    setAlteracaoData({
                      ...alteracaoData,
                      numero: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="box23">
                <label>Complemento</label>
                <Input
                  name="complemento"
                  type="text"
                  value={alteracaoData.complemento}
                  onChange={(e) => {
                    setAlteracaoData({
                      ...alteracaoData,
                      complemento: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="box3">
              <div className="box31">
                <label>Cidade</label>
                <Input
                  name="cidade"
                  type="text"
                  value={alteracaoData.cidade}
                  onChange={(e) => {
                    setAlteracaoData({
                      ...alteracaoData,
                      cidade: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="box32">
                <label>Estado</label>
                <Input
                  name="estado"
                  type="text"
                  value={alteracaoData.estado}
                  onChange={(e) => {
                    setAlteracaoData({
                      ...alteracaoData,
                      estado: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="box33">
                <label>CEP</label>
                <Input
                  name="cep"
                  type="text"
                  value={alteracaoData.cep}
                  onChange={(e) => {
                    setAlteracaoData({
                      ...alteracaoData,
                      cep: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </BoxForm>
      </Form>
    </Container>
  );
}

export default Alteracao;
