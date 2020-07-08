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
import api from '../../../services/api';

function Cadastro() {
  let history = useHistory();
  const [mostraMensagem, setMostraMensagem] = useState('');
  const [destinatarioData, setDestinatarioData] = useState([]);
  const [entregadorData, setEntregadorData] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
    recipient_id: '',
    deliveryman_id: '',
  });

  async function gravarEncomenda(data, { resetForm }) {
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
      const encomendasData = await api.post('deliverys', dados);
      if (encomendasData.data.id) {
        setMostraMensagem('Cadastro efetuado com sucesso!');
        resetForm();
      } else {
        setMostraMensagem(encomendasData.data.error);
      }
    } catch (error) {
      setMostraMensagem('Erro ao efetuar cadastro!');
    }
  }

  async function fetchData() {
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

    setDestinatarioData(newDestinatarioData);
    setEntregadorData(newEntregadorData);
  }

  useEffect(() => {
    fetchData();
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
      <Form onSubmit={gravarEncomenda}>
        {mostraMensagem.length > 0 && (
          <BoxMensagem>{mostraMensagem}</BoxMensagem>
        )}
        <Boxtitle>
          <Title>Cadastro de encomendas</Title>
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
                  name="destinatario"
                  styles={customStyles}
                  options={destinatarioData}
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
                  name="entregador"
                  styles={customStyles}
                  options={entregadorData}
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
              <Input name="product" type="text" />
            </div>
          </div>
        </BoxForm>
      </Form>
    </Container>
  );
}

export default Cadastro;
