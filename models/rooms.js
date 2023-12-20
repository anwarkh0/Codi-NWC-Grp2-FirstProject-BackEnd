import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rooms.belongsTo(models.HotelsModel);
      Rooms.hasMany(models.ReservationModel, {
        foreignKey: 'roomId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
    }
  }
  Rooms.init({
    number: DataTypes.NUMBER,
    // image: DataTypes.ARRAY,
    quality: DataTypes.ENUM('High' , 'Medium' , 'Low'),
    guestNumber: DataTypes.NUMBER,
    isBooked: DataTypes.BOOLEAN,
    hotelId: DataTypes.NUMBER,
    price: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Rooms',
  });
  return Rooms;
};