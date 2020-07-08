import Sequelize from 'sequelize';

import User from '../app/models/Users';

import Recipients from '../app/models/Recipients';

import Deliverys from '../app/models/Deliverys';

import Deliverymans from '../app/models/Deliverymans';

import Delivery_problems from '../app/models/Delivery_problems';

import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [
  User,
  Recipients,
  Deliverys,
  Deliverymans,
  Delivery_problems,
  File,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associete && model.associete(this.connection.models));
  }
}

export default new Database();
