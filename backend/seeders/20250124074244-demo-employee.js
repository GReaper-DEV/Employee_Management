'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('employees', [{
        name: faker.person.fullName(),
        email: faker.internet.email(),
        position: faker.person.jobTitle(),
        salary: faker.number.float({min:0, max:5000, fractionDigits: 2}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        position: faker.person.jobTitle(),
        salary: faker.number.float({min:0, max:5000, fractionDigits: 2}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        position: faker.person.jobTitle(),
        salary: faker.number.float({min:0, max:5000, fractionDigits: 2}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
