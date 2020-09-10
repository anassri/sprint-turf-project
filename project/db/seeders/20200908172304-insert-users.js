'use strict';

const bcrypt = require("bcryptjs");
const faker = require('faker')
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
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Yongho",
      lastName: "Kim",
      email: "example@gmail.com",
      hashedPassword: bcrypt.hashSync("tenet"),
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Ammar",
      lastName: "Nassri",
      email: "email@gmail.com",
      hashedPassword: bcrypt.hashSync("appacademy"),
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.findName().split(" ")[0],
      lastName: faker.name.findName().split(" ")[1],
      email: faker.internet.email(),
      hashedPassword: bcrypt.hashSync(faker.internet.password()),
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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
