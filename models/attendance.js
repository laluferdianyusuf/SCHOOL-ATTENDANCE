"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class attendances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      attendances.belongsTo(models.students, {
        foreignKey: "studentId",
      });
      attendances.belongsTo(models.schools, {
        foreignKey: "schoolId",
      });
      attendances.hasMany(models.notifications, {
        foreignKey: "attendanceId",
      });
      // Attendance.hashMany(models.notifications, {
      //   foreignKey: "attendanceId",
      // });
    }
  }
  attendances.init(
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
  return attendances;
};
