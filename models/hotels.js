import {Model} from 'sequelize'
export default (sequelize, DataTypes) => {
  class Hotels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotels.hasMany(models.RatingModel, {
        foreignKey: 'hotelId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
      Hotels.hasMany(models.RoomsModel, {
        foreignKey: 'hotelId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
      Hotels.hasMany(models.RulesModel, {
        foreignKey: 'hotelId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })
      Hotels.hasMany(models.HotelImagesModel,{
        foreignKey: 'hotelId',
        onUpdate: 'CASCADE',
        onDelete: "CASCADE"
      })

      Hotels.belongsTo(models.UsersModel)
    }
  }
  Hotels.init({
    userId : DataTypes.NUMBER , 
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    description : DataTypes.TEXT
    
  }, {
    sequelize,
    modelName: 'Hotels',
  });
  return Hotels;
};