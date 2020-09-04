'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
    Team.hasMany(models.Project, { foreignKey: "teamId" })
    Team.hasMany(models.User, { foreignKey: "teamId" })
  };
  return Team;
};
