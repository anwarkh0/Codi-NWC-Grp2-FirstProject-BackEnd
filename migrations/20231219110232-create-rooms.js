'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false ,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quality: {
        type: Sequelize.ENUM("High","Medium", "Low"),
        defaultValue: "Medium",
        allowNull: false,
      },
      guestNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isBooked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      price: {
        type: Sequelize.INTEGER ,
        allowNull: false ,
      },
      // date : {
      //   type : Sequelize.ARRAY(Sequelize.DATE) ,
      //   allowNull: false
      // },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};