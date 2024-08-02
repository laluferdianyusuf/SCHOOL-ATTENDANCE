const { students } = require("../models");

class StudentRepository {
  static async addStudent({ name, schoolId, classroom }) {
    const addStudent = await students.create({
      name,
      schoolId,
      classroom,
    });
    return addStudent;
  }

  static async updateStudent({
    id,
    name,
    classroom,
    parentName,
    job,
    relationship,
    parentPhone,
    fingerprint,
  }) {
    const updateStudent = await students.update(
      {
        name,
        classroom,
        parentName,
        job,
        relationship,
        parentPhone,
        fingerprint,
      },
      { where: { id: id } }
    );

    return updateStudent;
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

  static async getStudentById({ id }) {
    const getStudent = await students.findOne({ where: { id: id } });
    return getStudent;
  }

  static async getStudentByClassroom({ classroom }) {
    const getStudent = await students.findOne({
      where: { classroom: classroom },
    });
    return getStudent;
  }

  static async deleteStudent({ id }) {
    const deleteStudent = await students.destroy({ where: { id: id } });
    return deleteStudent;
  }
}

module.exports = StudentRepository;
