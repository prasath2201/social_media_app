"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Posts", "created_by", {
        type: Sequelize.UUID,
        references: { model: "user_profiles", key: "id" },
      }),
      queryInterface.addColumn("replies", "created_by", {
        type: Sequelize.UUID,
        references: { model: "user_profiles", key: "id" },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
