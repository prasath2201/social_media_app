"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.UserProfile, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
      Posts.hasMany(models.Commands, {
        onDelete: "CASCADE",
        foreignKey: "post_id",
      });
      Posts.hasMany(models.likes, {
        onDelete: "CASCADE",
        foreignKey: "post_id",
        as: "like",
      });
    }
  }
  Posts.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      post: {
        type: DataTypes.STRING,
      },
      description: {
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
      created_by: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Posts",
      tableName: "Posts",
    }
  );
  return Posts;
};
