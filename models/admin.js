"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.belongsTo(models.schools, { foreignKey: "schoolId" });
    }
  }
  Admin.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      schoolId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "admins",
    }
  );
  return Admin;
};
