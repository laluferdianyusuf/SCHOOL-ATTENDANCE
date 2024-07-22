const { Attendance } = require("../models");

class AttendanceRepository {
  static async createAttendance({ present, timestamp, studentId, schoolId }) {
    const createAttendance = await Attendance.create({
      present,
      timestamp,
      studentId,
      schoolId,
    });
    return createAttendance;
  }

  static async getAttendanceBySchoolId({ schoolId }) {
    const getAttendance = await Attendance.find({ where: { schoolId } });
    return getAttendance;
  }

  static async getAttendanceByStudentId({ studentId }) {
    const getAttendance = await Attendance.find({ where: { studentId } });
    return getAttendance;
  }
}

module.exports = AttendanceRepository;
