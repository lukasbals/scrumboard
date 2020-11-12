import { Sequelize } from 'sequelize';

let sequelize: Sequelize = null;

const getSequelize = (): Sequelize => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(
    'postgres://scrumboard:scrumboard@localhost:5432/postgres',
  );
  return sequelize;
};

export default getSequelize;
