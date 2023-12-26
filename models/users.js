import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.ReservationModel , {
        foreignKey: 'userId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })

      Users.hasMany(models.RatingModel, {
        foreignKey: 'userId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })

      Users.hasMany(models.RoomsModel , {
        foreignKey: 'userId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })

      Users.hasMany(models.HotelsModel , {
        foreignKey: 'userId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM("Admin","Hotel Manager", "Customer"),
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};