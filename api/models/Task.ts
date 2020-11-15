import { DataTypes, Model } from 'sequelize';
import getSequelize from '../sequelize';

const sequelize = getSequelize();

class Task extends Model {}
Task.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    username: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    usercolor: {
      type: DataTypes.STRING,
      defaultValue: '#ffff',
    },
    state: {
      type: DataTypes.ENUM,
      values: ['TODO', 'IN_PROGRESS', 'VERIFY', 'DONE'],
      defaultValue: 'TODO',
    },
  },
  {
    sequelize,
    modelName: 'task',
    tableName: 'task',
    indexes: [{ unique: true, fields: ['id'] }],
    paranoid: true,
  },
);

export default Task;
