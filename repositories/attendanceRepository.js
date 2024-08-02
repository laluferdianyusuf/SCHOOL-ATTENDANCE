const { attendances, students } = require("../models");

class AttendanceRepository {
  static async createAttendance({ present, studentId, schoolId, timestamp }) {
    const createAttendance = await attendances.create({
      present,
      studentId,
      schoolId,
      timestamp,
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

  static async getAttendanceBySchoolId({ schoolId }) {
    const getAttendance = await attendances.findAll({
      where: { schoolId: schoolId },
      include: [
        {
          model: students,
          attributes: ["name", "classroom"],
        },
      ],
    });

    return getAttendance;
  }
}

module.exports = AttendanceRepository;
