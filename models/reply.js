"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      reply.belongsTo(models.Commands, {
        onDelete: "CASCADE",
        foreignKey: "id",
      });
      reply.belongsTo(models.Commands, {
        onDelete: "CASCADE",
        foreignKey: "id",
      });
      reply.belongsTo(models.UserProfile, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
    }
  }
  reply.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      command_id: {
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
      modelName: "reply",
    }
  );
  return reply;
};
