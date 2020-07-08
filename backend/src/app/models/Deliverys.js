import Sequelize, { Model } from 'sequelize';

class Deliverys extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associete(models) {
    this.belongsTo(models.Recipients, {
      foreignKey: 'recipient_id',
      as: 'Recipients',
    });
    this.belongsTo(models.Deliverymans, {
      foreignKey: 'deliveryman_id',
      as: 'Deliverymans',
    });
  }
}

export default Deliverys;
