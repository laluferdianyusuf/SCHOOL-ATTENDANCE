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
      School.hasMany(models.Student, {
        foreignKey: "schoolId",
      });
      School.hasMany(models.Attendance, {
        foreignKey: "schoolId",
      });
      // School.hasMany(models.FingerprintDevice, {
      //   foreignKey: "schoolId",
      // });
      School.hasMany(models.Admin, {
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
      modelName: "School",
    }
  );
  return School;
};
