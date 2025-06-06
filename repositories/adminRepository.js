const { admins } = require("../models");

class AdminRepository {
  static async createAdmin({
    name,
    username,
    email,
    password,
    role,
    schoolId,
    studentId,
  }) {
    const createAdmin = await admins.create({
      name,
      username,
      email,
      password,
      role,
      schoolId,
      studentId,
    });

    return createAdmin;
  }

  static async findAdminById({ id }) {
    const findAdmin = await admins.findOne({ where: { id } });
    return findAdmin;
  }

  static async findAdminByEmail({ email }) {
    const findAdmin = await admins.findOne({ where: { email } });
    return findAdmin;
  }

  static async getAdminBySchoolId({ schoolId }) {
    const getAdmin = await admins.findAll({ where: { schoolId } });
    return getAdmin;
  }

  static async getAdminByUsername({ username }) {
    const getAdmin = await admins.findOne({ where: { username } });
    return getAdmin;
  }
  static async getAdminByStudentId({ studentId }) {
    const getAdmin = await admins.findOne({ where: { studentId } });
    return getAdmin;
  }
}

module.exports = AdminRepository;
