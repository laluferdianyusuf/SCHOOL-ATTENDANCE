"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class schools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      schools.hasMany(models.students, {
        foreignKey: "schoolId",
      });
      schools.hasMany(models.teachers, {
        foreignKey: "schoolId",
      });
      schools.hasMany(models.attendances, {
        foreignKey: "schoolId",
      });
      schools.hasMany(models.admins, {
        foreignKey: "schoolId",
      });
    }
  }
  schools.init(
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
  return schools;
};
