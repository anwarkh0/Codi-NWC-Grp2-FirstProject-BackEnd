import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class RoomImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RoomImages.init({
    imageURL: DataTypes.STRING,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoomImages',
  });
  return RoomImages;
};