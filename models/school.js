"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class School extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      School.hasMany(models.students, {
        foreignKey: "schoolId",
      });
      School.hasMany(models.attendances, {
        foreignKey: "schoolId",
      });
      // School.hasMany(models.FingerprintDevice, {
      //   foreignKey: "schoolId",
      // });
      School.hasMany(models.admins, {
        foreignKey: "schoolId",
      });
    }
  }
  School.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "schools",
    }
  );
  return School;
};
