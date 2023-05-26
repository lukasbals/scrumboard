import { Sequelize } from 'sequelize';

let sequelize: Sequelize = null;

const getSequelize = (): Sequelize => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(process.env.POSTGRES_URL, { ssl: true });
  return sequelize;
};

export default getSequelize;
