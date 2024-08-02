const { teachers } = require("../models");

class TeacherRepository {
  static async createTeacher({
    name,
    address,
    born,
    gender,
    religion,
    nip,
    schoolId,
  }) {
    const createTeacher = await teachers.create({
      name,
      address,
      born,
      gender,
      religion,
      nip,
      schoolId,
    });
    return createTeacher;
  }

  static async updateTeacher({
    id,
    name,
    address,
    born,
    gender,
    religion,
    nip,
  }) {
    const updateTeacher = await teachers.update(
      {
        name,
        address,
        born,
        gender,
        religion,
        nip,
      },
      { where: { id: id } }
    );

    return updateTeacher;
  }

  static async getTeachersBySchoolId({ schoolId }) {
    const getTeachers = await teachers.findAll({
      where: { schoolId: schoolId },
    });
    return getTeachers;
  }

  static async getTeacherById({ id }) {
    const getTeacher = await teachers.findOne({ where: { id: id } });
    return getTeacher;
  }

  static async deleteTeacher({ id }) {
    const deleteTeacher = await teachers.destroy({ where: { id: id } });
    return deleteTeacher;
  }
}

module.exports = TeacherRepository;
