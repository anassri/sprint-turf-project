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
      description: "This is a project from App/A that functions similarly to twitter at a basic level, this a test description for the project",
      teamId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
     projectName: "Remember the milk clone",
     deadline: new Date(),
     status: true,
     description: "First project from App/A, this a test description for the project",
     teamId: 1,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
     projectName: "Order66",
     deadline: new Date(),
     status: true,
     description: "All jedi are traitors and must be eliminated, this a test description for the project",
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
