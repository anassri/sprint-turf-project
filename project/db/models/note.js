'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    note: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Team, { foreignKey: "teamId" });
    Note.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Note;
};