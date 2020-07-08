module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'delivery_problems',
      [
        {
          delivery_id: 1,
          description: 'Carga com lacre defeituoso!',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
