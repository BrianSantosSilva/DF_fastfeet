import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { Container, Title, BoxForm, BetweenTop } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import MenuOption from './MenuOption';

import api from '../../services/api';

import { eZero } from '../../functions/global';

export default function Destinatarios() {
  const elements = [1, 2];
  const [destinatariosData, setDestinatariosData] = useState([]);

  async function fetchData(data) {
    let urlED = 'recipients';
    if (data) {
      urlED = urlED + '?q=' + data.SearchDestinatarios;
    }
    const destinatariosData = await api.get(urlED, {});

    setDestinatariosData(destinatariosData.data);
  }

  async function excluirDestinatario(id) {
    const destinatariosData = await api.delete(`recipients/${id}`, {});

    setDestinatariosData(destinatariosData.data);
  }

  async function confirmExcluirDestinatario(id) {
    confirmAlert({
      title: 'Atenção!',
      message: 'Realmente deseja excluir esse destinatário?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            excluirDestinatario(id);
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
      <Title>Gerenciando destinatários</Title>
      <BoxForm>
        <Form onSubmit={fetchData}>
          <BetweenTop>
            <Input
              name="SearchDestinatarios"
              type="text"
              placeholder="Buscar por destinatários"
            />
            <Link to="/destinatarios/cadastro">
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
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {destinatariosData.map((destinatario) => (
              <tr>
                <td>#{eZero(destinatario.id, 2)}</td>

                <td>{destinatario.name}</td>
                <td>
                  {destinatario.rua}, {destinatario.numero},{' '}
                  {destinatario.cidade} - {destinatario.estado}
                </td>

                <td>
                  <div>
                    <MenuOption
                      idDestinatario={destinatario.id}
                      onChange={confirmExcluirDestinatario}
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
