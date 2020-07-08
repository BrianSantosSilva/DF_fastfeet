import Sequelize, { Model } from 'sequelize';

class Deliverymans extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        avatar_id: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associete(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'File',
    });
  }
}

export default Deliverymans;
