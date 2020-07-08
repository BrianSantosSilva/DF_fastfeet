module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliverys',
      [
        {
          recipient_id: 1,
          deliveryman_id: 1,
          signature_id: 1,
          product: 'Barbeador elétrico',
          start_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 2,
          deliveryman_id: 1,
          signature_id: 2,
          product: 'Secador de Cabelo',
          start_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          recipient_id: 3,
          product: 'Pantufas',
          start_date: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
