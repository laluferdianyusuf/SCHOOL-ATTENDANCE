const { Admin, School } = require("../models");

class AdminRepository {
  static async createAdmin({
    name,
    username,
    email,
    password,
    role,
    schoolId,
  }) {
    const createAdmin = await Admin.create({
      name,
      username,
      email,
      password,
      role,
      schoolId,
    });

    return createAdmin;
  }

  static async findAdminById({ id }) {
    const findAdmin = await Admin.findOne({ where: { id } });
    return findAdmin;
  }

  static async findAdminByEmail({ email }) {
    const findAdmin = await Admin.findOne({ where: { email } });
    return findAdmin;
  }

  static async getAdminBySchoolId({ schoolId }) {
    const getAdmin = await Admin.findAll({ where: { schoolId } });
    return getAdmin;
  }

  static async getAdminByUsername({ username }) {
    const getAdmin = await Admin.findOne({ where: { username } });
    return getAdmin;
  }
}

module.exports = AdminRepository;
