import { Sequelize } from 'sequelize';

let sequelize: Sequelize = null;

const getSequelize = (): Sequelize => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(process.env.DB_CONNECTION);
  return sequelize;
};

export default getSequelize;
