'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    projectName: DataTypes.STRING,
    deadline: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    teamId: DataTypes.INTEGER,
    priority: DataTypes.NUMERIC(3,0)
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsTo(models.Team, { foreignKey: "teamId"})
    Project.hasMany(models.Tag, { foreignKey: "tagId" })
    Project.hasMany(models.Note, { foreignKey: "projectId" })


  };
  return Project;
};
