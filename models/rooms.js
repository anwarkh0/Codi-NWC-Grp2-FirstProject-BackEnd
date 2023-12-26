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
      Rooms.belongsTo(models.UsersModel);
      Rooms.hasMany(models.ReservationModel, {
        foreignKey: 'roomId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
      Rooms.hasMany(models.RoomImagesModel, {
        foreignKey: 'roomId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
    }
  }
  Rooms.init({
    userId : DataTypes.NUMBER ,
    number: DataTypes.NUMBER,
    quality: DataTypes.ENUM('High' , 'Medium' , 'Low'),
    guestNumber: DataTypes.NUMBER,
    isBooked: DataTypes.BOOLEAN,
    hotelId: DataTypes.NUMBER,
    price: DataTypes.NUMBER,
    description : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Rooms',
    timestamps: true,
  });
  return Rooms;
};