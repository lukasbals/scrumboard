import { userInfo } from 'os';
import { Sequelize, DataTypes } from 'sequelize';
import getSequelize from './sequelize';

const sequelize = getSequelize();

const Board = sequelize.define(
  'Board',
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'board',
  },
);

// `sequelize.define` also returns the model
console.log(Board === sequelize.models.Board); // true

export default Board;
