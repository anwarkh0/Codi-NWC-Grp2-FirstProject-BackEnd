import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Rules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rules.belongsTo(models.HotelsModel)
    }
  }
  Rules.init({
    icon: DataTypes.STRING,
    description: DataTypes.STRING,
    hotelId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Rules',
  });
  return Rules;
};