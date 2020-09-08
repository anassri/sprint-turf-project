'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    projectName: DataTypes.STRING,
    deadline: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    teamId: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.Team, { foreignKey: "teamId"})
  };
  return Project;
};
