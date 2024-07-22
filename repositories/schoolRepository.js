const { schools } = require("../models");

class SchoolRepository {
  static async addSchool({ name, address, phone }) {
    const addSchool = await attendances.create({ name, address, phone });
    return addSchool;
  }

  static async getSchoolById({ schoolId }) {
    const getSchool = await attendances.findOne({ where: { id: schoolId } });
    return getSchool;
  }

  static async getSchoolByName({ name }) {
    const getSchool = await attendances.findOne({ where: { name } });
    return getSchool;
  }

  static async getAllSchools() {
    const getSchool = await attendances.findAll();
    return getSchool;
  }
}

module.exports = SchoolRepository;
