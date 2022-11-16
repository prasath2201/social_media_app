"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      likes.belongsTo(models.Posts, {
        onDelete: "CASCADE",
        foreignKey: "id",
      });
      likes.belongsTo(models.Commands, {
        onDelete: "CASCADE",
        foreignKey: "id",
      });
      likes.belongsTo(models.UserProfile, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
    }
  }
  likes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      command_id: {
        type: DataTypes.UUID,
      },
      post_id: {
        type: DataTypes.UUID,
      },
      type: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
