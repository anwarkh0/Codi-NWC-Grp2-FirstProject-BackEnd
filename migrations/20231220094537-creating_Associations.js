'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Ratings', 'hotelId',{
      type: Sequelize.INTEGER ,
      allowNull: false ,
      references: {
        model: 'Hotels',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addColumn('Rules', 'hotelId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Hotels',
        key: 'id'
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    await queryInterface.addColumn('Rooms', 'hotelId',{
      type: Sequelize.INTEGER,
      allowNull: false ,
      references: {
        model: 'Hotels',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    
    await queryInterface.addColumn('Reservations', 'roomId',{
      type: Sequelize.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addColumn('Reservations', 'userId',{
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.changeColumn('RoomImages', 'roomId',{
      type: Sequelize.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.changeColumn('HotelImages', 'hotelId',{
      type: Sequelize.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
