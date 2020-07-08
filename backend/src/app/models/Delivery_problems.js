import Sequelize, { Model } from 'sequelize';

class Delivery_problems extends Model {
  static init(sequelize) {
    super.init(
      {
        delivery_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associete(models) {
    this.belongsTo(models.Deliverys, {
      foreignKey: 'delivery_id',
      as: 'Deliverys',
    });
  }
}

export default Delivery_problems;
