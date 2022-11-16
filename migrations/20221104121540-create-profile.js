"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("profiles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      profile_image: {
        type: DataTypes.STRING,
      },
      mobile_no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "mobile no must not be null" },
          notEmpty: { msg: "mobile no must not be empty" },
        },
      },
      mobile_coutry_no: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "mobile_coutry_no  must not be empty" },
          notEmpty: { msg: "mobile_coutry_no must not be empty" },
        },
      },
      country: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
      },
      banner_image: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      user_profile_id: {
        type: DataTypes.UUID,
        references: { model: "user_profiles", key: "id" },
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("profiles");
  },
};
