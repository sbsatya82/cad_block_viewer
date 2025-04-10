import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import File from './File.js';

const Block = sequelize.define('Block', {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  x: DataTypes.FLOAT,
  y: DataTypes.FLOAT,
});

Block.belongsTo(File);
File.hasMany(Block);

export default Block;
