"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("user_profiles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      Name: {
        type: DataTypes.STRING,
        unique: true,
      },
      email_id: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(64),
      },
      createdAt: {
        defaultValue: new Date(),
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: new Date(),
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("user_profiles");
  },
};
