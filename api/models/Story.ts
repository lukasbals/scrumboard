import { DataTypes } from 'sequelize';
import getSequelize from '../sequelize';
import Board from './Board';

const sequelize = getSequelize();

const Story = sequelize.define(
  'Story',
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    boardName: {
      type: DataTypes.STRING,

      references: {
        model: Board,
        key: 'name',
      },
    },
  },
  {
    tableName: 'story',
    indexes: [{ unique: true, fields: ['id'] }],
  },
);

export default Story;
