"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      notifications.belongsTo(models.attendances, {
        foreignKey: "attendanceId",
      });
      notifications.belongsTo(models.schools, {
        foreignKey: "schoolId",
      });
      notifications.belongsTo(models.students, {
        foreignKey: "studentId",
      });
      notifications.belongsTo(models.admins, {
        foreignKey: "userId",
      });
    }
  }
  notifications.init(
    {
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      schoolId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      attendanceId: DataTypes.INTEGER,
      isOpened: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "notifications",
    }
  );
  return notifications;
};
