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
      Rating.belongsTo(models.UsersModel)
    }
  }
  Rating.init({
    rate: DataTypes.DECIMAL,
    feedback: DataTypes.STRING,
    hotelId: DataTypes.NUMBER,
    userId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};