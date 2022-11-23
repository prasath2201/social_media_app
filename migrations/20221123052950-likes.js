"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("likes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      command_id: {
        type: Sequelize.UUID,
        references: { model: "commands", key: "id" },
      },
      post_id: {
        type: Sequelize.UUID,
        references: { model: "Posts", key: "id" },
      },
      type: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      liked_by: {
        type: Sequelize.UUID,
        references: { model: "user_profiles", key: "id" },
      },
      created_by: {
        type: Sequelize.UUID,
        references: { model: "user_profiles", key: "id" },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("likes");
  },
};
