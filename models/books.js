'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({BookAuthors, Categories, BookCopies, Waitlists}) {
      // this.hasMany(BookAuthors, {
      //   onDelete: "cascade",
      // });
      //
      // this.hasMany(Waitlists, {
      //   onDelete: "cascade",
      // });
      //
      this.belongsTo(Categories, { foreignKey: "categoryId", as: "books" });
      //
      // this.hasMany(BookCopies, {
      //   onDelete: "cascade",
      // });
    }
  }
  Books.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};