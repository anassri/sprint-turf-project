'use strict';

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
   return queryInterface.bulkInsert('Projects', [
    {
      projectName: "Twitter-Lite",
      deadline: new Date(),
      status: true,
      description: "[\"Test1\",\"Test2\",\"Test3\"]",
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
     projectName: "Remember the milk clone",
     deadline: new Date(),
     status: true,
     description: "[\"Test4\",\"Test5\",\"Test6\"]",
     teamId: 2,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     projectName: "Order66",
     deadline: new Date(),
     status: true,
     description: "[\"Test7\",\"Test8\",\"Test9\"]",
     teamId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    projectName: "Yeehaw",
    deadline: new Date(),
    status: false,
    teamId: 2,
    description: "[\"Test10\",\"Test11\",\"Test12\"]",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    projectName: "Amusement Park Tracker",
    deadline: new Date(),
    status: true,
    description: "[\"Test13\",\"Test14\",\"Test15\"]",
    teamId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    projectName: "Recipe Box",
    deadline: new Date(),
    status: false,
    description: "[\"Test16\",\"Test17\",\"Test18\"]",
    teamId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    projectName: "TENET",
    deadline: new Date(),
    status: true,
    description: "[\"Test19\",\"Test20\",\"Test21\"]",
    teamId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    projectName: "Regex",
    deadline: new Date(),
    status: true,
    description: "[\"Test20\",\"Test21\",\"Test22\"]",
    teamId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    projectName: "Manhatten Project",
    deadline: new Date(),
    status: false,
    description: "[\"Test23\",\"Test24\",\"Test25\"]",
    teamId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    projectName: "Operation Paperclip",
    deadline: new Date(),
    status: true,
    description: "[\"Test26\",\"Test27\",\"Test28\"]",
    teamId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
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
   return queryInterface.bulkDelete('Projects');
  }
};
