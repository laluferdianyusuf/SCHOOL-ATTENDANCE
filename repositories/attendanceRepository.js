const { attendances } = require("../models");

class AttendanceRepository {
  static async createAttendance({ present, studentId }) {
    const createAttendance = await attendances.create({
      present,
      studentId,
    });
    return createAttendance;
  }

  static async getAttendanceBySchoolId({ schoolId }) {
    const getAttendance = await attendances.find({ where: { schoolId } });
    return getAttendance;
  }

  static async getAttendanceByStudentId({ studentId }) {
    const getAttendance = await attendances.find({ where: { studentId } });
    return getAttendance;
  }
}

module.exports = AttendanceRepository;
