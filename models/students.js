"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      students.belongsTo(models.schools, {
        foreignKey: "schoolId",
      });
      students.hasMany(models.attendances, {
        foreignKey: "studentId",
      });
      students.hasMany(models.admins, {
        foreignKey: "studentId",
      });
    }
  }
  students.init(
    {
      name: DataTypes.STRING,
      schoolId: DataTypes.INTEGER,
      classroom: DataTypes.STRING,
      parentName: DataTypes.STRING,
      job: DataTypes.STRING,
      relationship: DataTypes.STRING,
      parentPhone: DataTypes.STRING,
      fingerprint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "students",
    }
  );
  return students;
};
