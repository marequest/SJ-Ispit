'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Patrons}) {
      // this.belongsTo(Patrons, {
      //   onDelete: "cascade",
      // });
    }
  }
  Notifications.init({
    sent_at: DataTypes.DATE,
    contents: DataTypes.STRING,
    patron_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};