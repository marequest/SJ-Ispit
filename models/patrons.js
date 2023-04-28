'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patrons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Waitlists, Chekouts, Holds, Notifications}) {
      // this.hasMany(Waitlists, {
      //   onDelete: "cascade",
      // });
      //
      // this.hasMany(Chekouts, {
      //   onDelete: "cascade",
      // });
      //
      // this.hasMany(Holds, {
      //   onDelete: "cascade",
      // });
      //
      // this.hasMany(Notifications, {
      //   onDelete: "cascade",
      // });
    }
  }
  Patrons.init({
    first_name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Patrons',
  });
  return Patrons;
};