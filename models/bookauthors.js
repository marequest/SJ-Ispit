'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookAuthors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Authors, Books}) {
      // this.belongsTo(Authors, { foreignKey: "authorId", as: "bookAuthors" });
      //
      // this.belongsTo(Books, {
      //   onDelete: "cascade",
      // });
    }
  }
  BookAuthors.init({
    book_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookAuthors',
  });
  return BookAuthors;
};