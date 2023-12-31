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
    checkInDate: {
      type : DataTypes.DATE ,
      allowNull: false ,
      validate: {
        isDate: true,
      },
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: function (value) {
          if (value <= this.checkInDate) {
            throw new Error('Check-out date must be after check-in date');
          }
        },
      },
    },
    totalPrice: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  }, {
    sequelize,
    modelName: 'Reservation',
    indexes: [
      {
        fields: ['roomId'],
      },
      {
        fields: ['userId'],
      },
    ],
  });
  return Reservation;
};