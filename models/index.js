import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import Hotels from './hotels.js' 
import Rating from './rating.js'
import Reservation from './reservation.js'
import Rooms from './rooms.js'
import Rules from './rules.js'
import Users from './users.js'
import HotelImages from './hotelimages.js'
import RoomImages from './roomimages.js'
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const UsersModel = Users(sequelize, Sequelize);
const HotelsModel = Hotels(sequelize, Sequelize);
const RatingModel = Rating(sequelize, Sequelize);
const ReservationModel = Reservation(sequelize, Sequelize);
const RoomsModel = Rooms(sequelize, Sequelize);
const RulesModel = Rules(sequelize, Sequelize);
const HotelImagesModel = HotelImages(sequelize, Sequelize)
const RoomImagesModel = RoomImages(sequelize , Sequelize)

const db = {
  sequelize,
  Sequelize,
  UsersModel,
  HotelsModel,
  RatingModel,
  RoomsModel,
  RulesModel,
  ReservationModel,
  HotelImagesModel,
  RoomImagesModel
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
export default db;
