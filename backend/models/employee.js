'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The NAME field is required.'
        },
        notNull: {
          msg: 'The NAME field is required.'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'The EMAIL field is required.'
        },
        notNull: {
          msg: 'The EMAIL field is required.'
        },
        isEmail: {
          msg: 'Please provide a valid email'
        }
      }
    },
    position: DataTypes.STRING,
    salary: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};