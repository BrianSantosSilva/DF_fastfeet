import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Container, Title, BoxForm, BetweenTop } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import MenuOption from './MenuOption';

import api from '../../services/api';

import { eZero, truncText } from '../../functions/global';

export default function Destinatarios() {
  const [prolemasData, setProlemasData] = useState([]);

  async function fetchData(data) {
    let urlED = '/delivery/problems';
    if (data) {
      urlED = urlED + '?q=' + data.SearchProblemas;
    }
    const prolemasData = await api.get(urlED, {});

    setProlemasData(prolemasData.data);
  }

  async function cancelarEncomenda(id) {
    const prolemasData = await api.delete(
      `/problems/${id}/cancel-delivery`,
      {}
    );

    setProlemasData(prolemasData.data);
  }

  async function cancelarEncomendaConfirm(id) {
    confirmAlert({
      title: 'Atenção!',
      message: 'Realmente deseja cancelar essa encomenda?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            cancelarEncomenda(id);
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
      <Title>Problemas na entrega</Title>
      <BoxForm>
        <Form onSubmit={fetchData}>
          <BetweenTop>
            <Input
              name="SearchProblemas"
              type="text"
              placeholder="Buscar por Encomendas"
            />
          </BetweenTop>
        </Form>

        <table>
          <thead>
            <tr>
              <th>Encomenda</th>
              <th>Problema</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {prolemasData.map((problema) => (
              <tr>
                <td>#{eZero(problema.id, 2)}</td>
                <td>{truncText(problema.description, 120)}</td>
                <td>
                  <div>
                    <MenuOption
                      problema={problema}
                      onChange={cancelarEncomendaConfirm}
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
