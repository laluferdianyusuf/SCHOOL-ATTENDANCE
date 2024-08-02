"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      teachers.belongsTo(models.schools, {
        foreignKey: "schoolId",
      });
    }
  }
  teachers.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      born: DataTypes.STRING,
      gender: DataTypes.STRING,
      religion: DataTypes.STRING,
      nip: DataTypes.STRING,
      schoolId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "teachers",
    }
  );
  return teachers;
};
