"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.hasOne(models.profile, {
        foreignKey: "user_profile_id",
      });
      UserProfile.hasMany(models.Commands, {
        foreignKey: "created_by",
      }),
        UserProfile.hasMany(models.reply, {
          onDelete: "CASCADE",
          foreignKey: "created_by",
        });
      // post
      UserProfile.hasMany(models.Posts, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
      // follow
      UserProfile.hasMany(models.Follwers, {
        onDelete: "CASCADE",
        foreignKey: "follwer",
      });
      UserProfile.hasMany(models.likes, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
      UserProfile.hasMany(models.SavedPosts, {
        onDelete: "CASCADE",
        foreignKey: "created_by",
      });
    }
  }
  UserProfile.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Name: {
        type: DataTypes.STRING,
        unique: true,
      },
      email_id: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      tableName: "user_profiles",
      modelName: "UserProfile",
    }
  );
  return UserProfile;
};
