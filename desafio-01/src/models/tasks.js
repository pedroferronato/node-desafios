'use strict';
const { randomUUID } = require('crypto')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Projetos, { foreignKey: 'projeto_id', as: 'projeto' })
    }
  };
  Tasks.init({
    title: DataTypes.STRING,
    taskRelevance: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  Tasks.beforeCreate(task => task.id = randomUUID())
  return Tasks;
};