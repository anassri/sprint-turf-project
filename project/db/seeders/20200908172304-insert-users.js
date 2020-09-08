'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [
     {
       firstName: "Matt",
       lastName: "Zamora",
       email: "email@gmail.com",
       hashedPassword: bcrypt.hashSync("1234"),
       teamId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      firstName: "Sam",
      lastName: "Holt",
      email: "hello@gmail.com",
      hashedPassword: bcrypt.hashSync("password"),
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Yongho",
      lastName: "Kim",
      email: "example@gmail.com",
      hashedPassword: bcrypt.hashSync("tenet"),
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Ammar",
      lastName: "Nassri",
      email: "email@gmail.com",
      hashedPassword: bcrypt.hashSync("appacademy"),
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Teams")
  }
};
