"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      news.belongsTo(models.schools, {
        foreignKey: "schoolId",
      });
    }
  }
  news.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      image: DataTypes.TEXT,
      schoolId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "news",
    }
  );
  return news;
};
