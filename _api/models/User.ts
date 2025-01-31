import { DataTypes, Model } from 'sequelize';
import getSequelize from '../sequelize';

const sequelize = getSequelize();

class User extends Model {}
User.init(
  {
    boardName: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: 'uniqueUser',
    },
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: 'uniqueUser',
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#ffffff',
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'user',
    paranoid: true,
  }
);

export default User;
