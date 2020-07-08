module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Vanessa Débora Marlene Mendes',
          rua: 'Rua José de Aluizio Soares Silva',
          numero: '340',
          complemento: 'Casa',
          estado: 'PE',
          cidade: 'Caruaru',
          cep: '55044-080',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Silvana Marina Pereira',
          rua: 'Rua Vinte e Oito',
          numero: '129',
          complemento: 'Casa',
          estado: 'MA',
          cidade: 'Timon',
          cep: '65633-470',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Fernanda Rayssa Carvalho',
          rua: 'Alameda Rio Doce',
          numero: '782',
          complemento: 'Casa',
          estado: 'GO',
          cidade: 'Jataí',
          cep: '75804-248',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
