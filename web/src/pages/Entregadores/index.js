import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { Container, Title, BoxForm, BetweenTop } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import MenuOption from './MenuOption';

import question from '../../assets/images/question.png';
import api from '../../services/api';

import { eZero } from '../../functions/global';

export default function Entregadores() {
  const [entregadoresData, setEntregadoresData] = useState([]);
  //const [entregadoresData, setEntregadoresData] = useState([]);

  async function fetchData(data) {
    let urlED = 'deliverymans';
    if (data) {
      urlED = urlED + '?q=' + data.SearchEntregadores;
    }
    const entregadoresData = await api.get(urlED, {});

    setEntregadoresData(entregadoresData.data);
  }

  async function excluirEntregador(id) {
    const entregadoresData = await api.delete(`deliverymans/${id}`, {});

    setEntregadoresData(entregadoresData.data);
  }

  async function confirmExcluirEntregador(id) {
    confirmAlert({
      title: 'Atenção!',
      message: 'Realmente deseja excluir esse entregador?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            excluirEntregador(id);
          },
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Title>Gerenciando entregadores</Title>
      <BoxForm>
        <Form onSubmit={fetchData}>
          <BetweenTop>
            <Input
              name="SearchEntregadores"
              type="text"
              placeholder="Buscar por entregadores"
            />
            <Link to="/entregadores/cadastro">
              <button type="button">
                <FontAwesomeIcon icon={faPlus} /> CADASTRAR
              </button>
            </Link>
          </BetweenTop>
        </Form>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {entregadoresData.map((entregador) => (
              <tr>
                <td>#{eZero(entregador.id, 2)}</td>

                <td>
                  <div>
                    <img
                      src={entregador ? entregador.File.path : question}
                      alt={entregador ? entregador.File.path : question}
                    />
                  </div>
                </td>
                <td>{entregador.name}</td>
                <td>{entregador.email}</td>

                <td>
                  <div>
                    <MenuOption
                      idEntregador={entregador.id}
                      onChange={confirmExcluirEntregador}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </BoxForm>
    </Container>
  );
}
