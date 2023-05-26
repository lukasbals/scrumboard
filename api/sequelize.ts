import { Sequelize } from 'sequelize';

let sequelize: Sequelize = null;

const getSequelize = (): Sequelize => {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialectOptions:
      process.env.NODE_ENV === 'production'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  });
  return sequelize;
};

export default getSequelize;
