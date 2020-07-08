import React, { useMemo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { Container, Title, BoxForm, BetweenTop } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import question from '../../assets/images/question.png';

import MenuOption from './MenuOption';

import api from '../../services/api';

import { eZero } from '../../functions/global';

function CorBaseFarol(status) {
  let cores = {};

  if (status === 1) {
    cores = {
      corBG: '#DFF0DF',
      colorTX: '#2CA42B',
    };
  } else if (status === 2) {
    cores = {
      corBG: '#F0F0DF',
      colorTX: '#C1BC35',
    };
  } else if (status === 3) {
    cores = {
      corBG: '#BAD2FF',
      colorTX: '#4D85EE',
    };
  } else if (status === 4) {
    cores = {
      corBG: '#FAB0B0',
      colorTX: '#DE3B3B',
    };
  }

  return cores;
}

function Farol({ encomendas }) {
  let coresFarol;
  let statusFarol;
  if (encomendas.end_date) {
    coresFarol = CorBaseFarol(1);
    statusFarol = 'Entregue';
  } else if (encomendas.canceled_at) {
    coresFarol = CorBaseFarol(4);
    statusFarol = 'Cancelada';
  } else if (encomendas.start_date) {
    coresFarol = CorBaseFarol(3);
    statusFarol = 'Retirada';
  } else {
    coresFarol = CorBaseFarol(2);
    statusFarol = 'Pendente';
  }

  return (
    <button style={{ color: coresFarol.colorTX, background: coresFarol.corBG }}>
      <FontAwesomeIcon icon={faCircle} />
      <span>{statusFarol}</span>
    </button>
  );
}

export default function Encomendas() {
  const [encomendasData, setEncomendasData] = useState([]);

  async function fetchData(data) {
    let urlED = 'deliverys';
    if (data) {
      urlED = urlED + '?q=' + data.SearchEncomendas;
    }
    const encomendasData = await api.get(urlED, {});

    setEncomendasData(encomendasData.data);
  }

  async function excluirEncomenda(id) {
    const encomendasData = await api.delete(`deliverys/${id}`, {});

    setEncomendasData(encomendasData.data);
  }

  async function confirmExcluirEncomenda(id) {
    confirmAlert({
      title: 'Atenção!',
      message: 'Realmente deseja excluir essa encomenda?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            excluirEncomenda(id);
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
      <Title>Gerenciando encomendas</Title>
      <BoxForm>
        <Form onSubmit={fetchData}>
          <BetweenTop>
            <Input
              name="SearchEncomendas"
              type="text"
              placeholder="Buscar por encomendas"
            />
            <Link to="/encomendas/cadastro">
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
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {encomendasData.map((encomenda) => (
              <tr>
                <td>#{eZero(encomenda.id, 2)}</td>
                <td>
                  {encomenda.Recipients ? encomenda.Recipients.name : '-'}
                </td>
                <td>
                  <div>
                    <img
                      src={
                        encomenda.Deliverymans
                          ? encomenda.Deliverymans.File.path
                          : question
                      }
                      alt={
                        encomenda.Deliverymans
                          ? encomenda.Deliverymans.File.path
                          : question
                      }
                    />
                    <span>
                      {encomenda.Deliverymans
                        ? encomenda.Deliverymans.name
                        : '-'}
                    </span>
                  </div>
                </td>
                <td>
                  {encomenda.Recipients ? encomenda.Recipients.cidade : '-'}
                </td>
                <td>
                  {encomenda.Recipients ? encomenda.Recipients.estado : '-'}
                </td>
                <td>
                  <Farol encomendas={encomenda} />
                </td>
                <td>
                  <div>
                    <MenuOption
                      encomenda={encomenda}
                      onChange={confirmExcluirEncomenda}
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
