'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookCopies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Books, Chekouts, Holds}) {
      // this.belongsTo(Books, {
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
    }
  }
  BookCopies.init({
    year_published: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    publisher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookCopies',
  });
  return BookCopies;
};