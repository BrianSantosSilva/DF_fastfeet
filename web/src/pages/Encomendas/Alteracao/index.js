import React, { useState, useEffect } from 'react';
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
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import api from '../../../services/api';

function Alteracao() {
  let history = useHistory();
  const [mostraMensagem, setMostraMensagem] = useState('');
  const [destinatarioData, setDestinatarioData] = useState([]);
  const [entregadorData, setEntregadorData] = useState([]);
  let { id } = useParams();

  const [formData, setFormData] = useState({
    product: '',
    recipient_id: '',
    deliveryman_id: '',
  });

  async function loadData() {
    const destinatarioData = await api.get('recipients', {});
    const entregadorData = await api.get('deliverymans', {});

    const newDestinatarioData = destinatarioData.data.map((obj) => {
      return {
        value: obj.id,
        label: obj.name,
      };
    });

    const newEntregadorData = entregadorData.data.map((obj) => {
      return {
        value: obj.id,
        label: obj.name,
      };
    });

    let urlED = 'deliverys';
    if (id) {
      urlED = urlED + '/' + id;
    }

    const encomendasData = await api.get(urlED, {});

    setFormData(encomendasData.data);

    setDestinatarioData(newDestinatarioData);
    setEntregadorData(newEntregadorData);
  }

  async function alterarEncomenda(data) {
    let dados = {
      product: data.product,
      recipient_id: formData.recipient_id,
      deliveryman_id: formData.deliveryman_id,
    };

    if (!data.product) {
      setMostraMensagem('Preencher produto!');
      return;
    }
    if (!formData.recipient_id) {
      setMostraMensagem('Preencher destinatário!');
      return;
    }
    if (!formData.deliveryman_id) {
      setMostraMensagem('Preencher entregador!');
      return;
    }

    try {
      const destinatariosData = await api.put(`deliverys/${id}`, dados);

      setMostraMensagem('Alteração efetuado com sucesso!');
    } catch (error) {
      setMostraMensagem('Erro ao efetuar alteração!');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: '45px',
    }),
    container: (base) => ({
      ...base,
      display: 'inline-block',
    }),
    valueContainer: (base) => ({
      ...base,
      height: '45px',
    }),
    singleValue: (base) => ({
      ...base,
      top: '28px',
    }),
  };

  return (
    <Container>
      <Form onSubmit={alterarEncomenda}>
        {mostraMensagem.length > 0 && (
          <BoxMensagem>{mostraMensagem}</BoxMensagem>
        )}
        <Boxtitle>
          <Title>Edição de encomendas</Title>
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
              <div className="box11">
                <label>Destinatário</label>

                <Select
                  styles={customStyles}
                  options={destinatarioData}
                  value={destinatarioData.map((item, index) => {
                    if (item.value === formData.recipient_id) {
                      return destinatarioData[index];
                    }
                  })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      recipient_id: e.value,
                    });
                  }}
                />
              </div>

              <div className="box12">
                <label>Entregador</label>
                <Select
                  styles={customStyles}
                  options={entregadorData}
                  value={entregadorData.map((item, index) => {
                    if (item.value === formData.deliveryman_id) {
                      return entregadorData[index];
                    }
                  })}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      deliveryman_id: e.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="box2">
              <label>Nome do Produto</label>
              <Input
                name="product"
                type="text"
                value={formData.product}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    product: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </BoxForm>
      </Form>
    </Container>
  );
}

export default Alteracao;
