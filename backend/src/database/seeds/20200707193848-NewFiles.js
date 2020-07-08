module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'files',
      [
        {
          name: '1a811da60309c5167449a776bfbb00ea.jpg',
          path: `${process.env.APP_URL}/files/1a811da60309c5167449a776bfbb00ea.jpg`,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '1ad50ce1ae4737a96e4a654ac8e62a74.jpg',
          path: `${process.env.APP_URL}/files/1ad50ce1ae4737a96e4a654ac8e62a74.jpg`,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: '4a30929a7d4d4e55a1f206de8beb7377.jpg',
          path: `${process.env.APP_URL}/files/4a30929a7d4d4e55a1f206de8beb7377.jpg`,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
