'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({BookAuthors}) {
      // this.hasMany(BookAuthors, {
      //   foreignKey: "authorId",
      //   as: "bookAuthors",
      //   onDelete: "cascade",
      // });
    }
  }
  Authors.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Authors',
  });
  return Authors;
};