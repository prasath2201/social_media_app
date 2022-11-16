"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commands.belongsTo(models.Posts, {
        onDelete: "CASCADE",
        foreignKey: "post_id",
      });
      Commands.belongsTo(models.UserProfile, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
      Commands.hasMany(models.likes, {
        onDelete: "CASCADE",
        foreignKey: "command_id",
      });
      Commands.hasMany(models.reply, {
        onDelete: "CASCADE",
        foreignKey: "command_id",
      });
    }
  }
  Commands.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      post_id: {
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
      created_by: {
        type: DataTypes.UUID,
      },
      command: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Commands",
      tableName: "commands",
    }
  );
  return Commands;
};
