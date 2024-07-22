const { schools } = require("../models");

class SchoolRepository {
  static async addSchool({ name, address, phone }) {
    const addSchool = await schools.create({ name, address, phone });
    return addSchool;
  }

  static async getSchoolById({ schoolId }) {
    const getSchool = await schools.findOne({ where: { id: schoolId } });
    return getSchool;
  }

  static async getSchoolByName({ name }) {
    const getSchool = await schools.findOne({ where: { name } });
    return getSchool;
  }

  static async getAllSchools() {
    const getSchool = await schools.findAll();
    return getSchool;
  }
}

module.exports = SchoolRepository;
