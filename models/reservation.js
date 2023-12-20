import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.RoomsModel);
      Reservation.belongsTo(models.UsersModel);
    }
  }
  Reservation.init({
    roomId: DataTypes.NUMBER,
    userId: DataTypes.NUMBER,
    checkInDate: DataTypes.DATE,
    checkOutDate: DataTypes.DATE,
    totalPrice: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};