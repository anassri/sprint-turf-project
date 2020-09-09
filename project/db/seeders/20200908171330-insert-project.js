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
     teamId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     projectName: "Order66",
     deadline: new Date(),
     status: true,
     description: "[\"Test7\",\"Test8\",\"Test9\"]",
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
   return queryInterface.bulkDelete('Projects');
  }
};
