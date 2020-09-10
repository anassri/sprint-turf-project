'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    note: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    Note.belongsTo(models.Project, { foreignKey: "projectId" });
    Note.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Note;
};