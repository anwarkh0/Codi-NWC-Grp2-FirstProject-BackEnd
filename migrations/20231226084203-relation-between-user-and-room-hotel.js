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
    await queryInterface.addColumn('Rooms', 'userId', {
      type: Sequelize.INTEGER ,
      allowNull : false , 
      references : {
        model : 'Users',
        key : 'id'
      }, 
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    await queryInterface.addColumn('Hotels', 'userId', {
      type: Sequelize.INTEGER ,
      allowNull : false , 
      references : {
        model : 'Users',
        key : 'id'
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
