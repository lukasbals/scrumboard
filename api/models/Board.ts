import { DataTypes } from 'sequelize';
import getSequelize from '../sequelize';

const sequelize = getSequelize();

const Board = sequelize.define(
  'Board',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  {
    tableName: 'board',
    indexes: [{ unique: true, fields: ['name'] }],
  },
);

export default Board;
