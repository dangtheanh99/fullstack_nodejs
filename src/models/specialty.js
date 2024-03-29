"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specialty.hasMany(models.Doctor_infor, {
        foreignKey: "specialtyId",
        as: "specialtyData",
      });
    }
  }
  Specialty.init(
    {
      nameVi: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );
  return Specialty;
};
