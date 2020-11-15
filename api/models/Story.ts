import { DataTypes, Model } from 'sequelize';
import getSequelize from '../sequelize';
import Task from './Task';

const sequelize = getSequelize();

class Story extends Model {}
Story.init(
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    link: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  },
  {
    sequelize,
    modelName: 'story',
    tableName: 'story',
    indexes: [{ unique: true, fields: ['id'] }],
    paranoid: true,
  },
);

Story.hasMany(Task);

export default Story;
