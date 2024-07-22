"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("attendances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      present: Sequelize.STRING,
      studentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "students",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      schoolId: {
        type: Sequelize.INTEGER,
        references: {
          model: "schools",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Attendances");
  },
};
