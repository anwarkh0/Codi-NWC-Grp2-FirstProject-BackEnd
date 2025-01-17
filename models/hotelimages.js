import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class HotelImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HotelImages.belongsTo(models.HotelsModel)
    }
  }
  HotelImages.init({
    icon: DataTypes.STRING,
    hotelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HotelImages',
  });
  return HotelImages;
};