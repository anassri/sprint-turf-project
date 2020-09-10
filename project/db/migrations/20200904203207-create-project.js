'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true
      },
      deadline: {
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      priority: {
        type: Sequelize.NUMERIC(0,3)
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tags' }
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: { model: "Teams" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};
