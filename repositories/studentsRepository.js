const { Student } = require("../models");

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
    const addStudent = await Student.create({
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
    const getStudent = await Student.findOne({ where: { name } });
    return getStudent;
  }

  static async getStudentBySchoolId({ schoolId }) {
    const getStudent = await Student.findAll({
      where: { schoolId: schoolId },
    });
    return getStudent;
  }

  static async getStudentFingerprint({ fingerprint }) {
    const getStudent = await Student.findOne({ where: { fingerprint } });
    return getStudent;
  }

  static async getStudentByClassroom({ classroom }) {
    const getStudent = await Student.findOne({
      where: { classroom: classroom },
    });
    return getStudent;
  }
}

module.exports = StudentRepository;
