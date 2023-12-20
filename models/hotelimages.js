'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotelImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HotelImages.init({
    imageURL: DataTypes.STRING,
    hotelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HotelImages',
  });
  return HotelImages;
};