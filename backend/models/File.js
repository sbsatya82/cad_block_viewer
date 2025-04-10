import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const File = sequelize.define('File', {
  name: DataTypes.STRING,
  uploadDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

export default File;