const { School } = require("../models");

class SchoolRepository {
  static async addSchool({ name, address, phone }) {
    const addSchool = await School.create({ name, address, phone });
    return addSchool;
  }

  static async getSchoolById({ schoolId }) {
    const getSchool = await School.findOne({ where: { id: schoolId } });
    return getSchool;
  }

  static async getSchoolByName({ name }) {
    const getSchool = await School.findOne({ where: { name } });
    return getSchool;
  }

  static async getAllSchools() {
    const getSchool = await School.findAll();
    return getSchool;
  }
}

module.exports = SchoolRepository;
