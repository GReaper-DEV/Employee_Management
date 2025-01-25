'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('Employees', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'The EMAIL field is required.'
        },
        isEmail: {
          msg: 'Please provide a valid email'
        },
        notEmpty: {
          msg: 'The EMAIL field is required.'
        }
        
      }

    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
