"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attendance.belongsTo(models.students, {
        foreignKey: "studentId",
      });
      Attendance.belongsTo(models.schools, {
        foreignKey: "schoolId",
      });
    }
  }
  Attendance.init(
    {
      present: DataTypes.STRING,
      timestamp: {
        type: DataTypes.STRING,
      },
      studentId: DataTypes.INTEGER,
      schoolId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "attendances",
    }
  );
  return Attendance;
};
