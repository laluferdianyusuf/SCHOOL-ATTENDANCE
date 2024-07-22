const { students } = require("../models");

class StudentRepository {
  static async addStudent({
    name,
    studentId,
    schoolId,
    classroom,
    parentName,
    job,
    relationship,
    parentPhone,
    fingerprint,
  }) {
    const addStudent = await students.create({
      name,
      studentId,
      schoolId,
      classroom,
      parentName,
      job,
      relationship,
      parentPhone,
      fingerprint,
    });
    return addStudent;
  }

  static async getStudentByName({ name }) {
    const getStudent = await students.findOne({ where: { name } });
    return getStudent;
  }

  static async getStudentBySchoolId({ schoolId }) {
    const getStudent = await students.findAll({
      where: { schoolId: schoolId },
    });
    return getStudent;
  }

  static async getStudentFingerprint({ id }) {
    const getStudent = await students.findOne({ where: { id: id } });
    return getStudent;
  }

  static async getStudentByClassroom({ classroom }) {
    const getStudent = await students.findOne({
      where: { classroom: classroom },
    });
    return getStudent;
  }
}

module.exports = StudentRepository;
