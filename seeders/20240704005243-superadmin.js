"use strict";
const bcrypt = require("bcrypt");
const { ROLES, JWT } = require("../lib/const");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("superadmin", JWT.SALT_ROUND);

    await queryInterface.bulkInsert("Admins", [
      {
        name: "superadmin",
        username: "superadmin",
        email: "superadmin@gmail.com",
        password: hashedPassword,
        role: ROLES.ADMIN,
        schoolId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
