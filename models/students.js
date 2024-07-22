"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.School, {
        foreignKey: "schoolId",
      });
      // Student.hasMany(models.School, {
      //   foreignKey: "studentId",
      // });
    }
  }
  Student.init(
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
      modelName: "Student",
    }
  );
  return Student;
};
