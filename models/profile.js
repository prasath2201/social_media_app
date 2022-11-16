"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user_profile
      profile.belongsTo(models.UserProfile, {
        onDelete: "CASCADE",
        foreignKey: "id",
      });
    }
  }
  profile.init(
    {
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
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "profile",
      tableName: "profiles",
    }
  );
  return profile;
};
