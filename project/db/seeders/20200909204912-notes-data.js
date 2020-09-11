'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Notes', [
        { note: "This is a test note", userId: 1 , projectId: 2, createdAt: new Date(), updatedAt: new Date()},
        { note: "This is a test note 2", userId: 1, projectId: 3, createdAt: new Date(), updatedAt: new Date()},
        { note: "This is a test note 3", userId: 1, projectId: 2, createdAt: new Date(), updatedAt: new Date()},
        { note: "This is a test note", userId: 2, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
        { note: "This is a test note", userId: 2, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
        ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Notes', null, {});
    
  }
};
