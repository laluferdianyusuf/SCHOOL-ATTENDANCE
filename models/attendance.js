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
      Attendance.belongsTo(models.Student, {
        foreignKey: "studentId",
      });
      Attendance.belongsTo(models.Student, {
        foreignKey: "schoolId",
      });
    }
  }
  Attendance.init(
    {
      present: DataTypes.STRING,
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      studentId: DataTypes.INTEGER,
      schoolId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );
  return Attendance;
};
