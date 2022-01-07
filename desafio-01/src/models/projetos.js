'use strict';
const { v4: uuidv4 } = require('uuid')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projetos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Tasks, 
        { 
          foreignKey: 'projeto_id', 
          as: 'tasks', 
          onDelete: 'cascade' 
        })
    }
  };
  Projetos.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Projetos',
  });
  Projetos.beforeCreate(projeto => projeto.id = uuidv4())
  return Projetos;
};