'use strict';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

  class User extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
  }

  User.init({
    userName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });

export default User;