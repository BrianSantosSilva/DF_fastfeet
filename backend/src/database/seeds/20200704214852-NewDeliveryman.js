module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'deliverymans',
      [
        {
          name: 'Martin Raul Yago Assis',
          avatar_id: 1,
          email: 'martinraulyagoassis__martinraulyagoassis@click21.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Francisco Miguel César Corte Real',
          avatar_id: 2,
          email: 'franciscomiguelcesarcortereal@globo.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Maria Bruna Aurora Pereira',
          avatar_id: 3,
          email: 'mariabrunaaurorapereira-94@tadex.com.br',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
