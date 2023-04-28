'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Waitlists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books, Patrons}) {
      // this.belongsTo(Books, {
      //   onDelete: "cascade",
      // });
      //
      // this.belongsTo(Patrons, {
      //   onDelete: "cascade",
      // });
    }
  }
  Waitlists.init({
    patron_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Waitlists',
  });
  return Waitlists;
};