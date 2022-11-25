"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SavedPosts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SavedPosts.hasMany(models.UserProfile, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
      SavedPosts.belongsTo(models.Posts, {
        onDelete: "CASCADE",
        foreignKey: "post_id",
      });
    }
  }
  SavedPosts.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      post_id: {
        type: DataTypes.UUID,
      },
      created_by: {
        type: DataTypes.UUID,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "SavedPosts",
      tableName: "saved_post",
    }
  );
  return SavedPosts;
};
