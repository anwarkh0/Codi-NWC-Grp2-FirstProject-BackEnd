import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsTo(models.HotelsModel);
    }
  }
  Rating.init({
    rate: DataTypes.NUMBER,
    feedback: DataTypes.STRING,
    hotelId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};