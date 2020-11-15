import { DataTypes, Model } from 'sequelize';
import getSequelize from '../sequelize';
import Story from './Story';

const sequelize = getSequelize();

class Board extends Model {
  name: string;
}
Board.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'board',
    tableName: 'board',
    indexes: [{ unique: true, fields: ['name'] }],
    paranoid: true,
  },
);

Board.hasMany(Story);

export default Board;
