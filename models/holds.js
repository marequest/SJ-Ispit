'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Holds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({BookCopies, Patrons}) {
      // this.belongsTo(BookCopies, {
      //   onDelete: "cascade",
      // });
      //
      // this.belongsTo(Patrons, {
      //   onDelete: "cascade",
      // });
    }
  }
  Holds.init({
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    book_id: DataTypes.INTEGER,
    patron_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Holds',
  });
  return Holds;
};