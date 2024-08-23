"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admins.belongsTo(models.schools, { foreignKey: "schoolId" });

      admins.belongsTo(models.students, { foreignKey: "studentId" });
      admins.hasMany(models.notifications, { foreignKey: "userId" });
    }
  }
  admins.init(
    {
      name: DataTypes.STRING,
      birthday: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      schoolId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "admins",
    }
  );
  return admins;
};
