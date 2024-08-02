const AttendanceService = require("../services/attendanceService");

const createAttendance = async (req, res) => {
  const { studentId, timestamp } = req.body;

  const { status, status_code, message, data } =
    await AttendanceService.createAttendance({
      studentId,
      timestamp,
    });
  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getAttendanceBySchoolId = async (req, res) => {
  const schoolId = req.admins.schoolId;
  const { status, status_code, message, data } =
    await AttendanceService.getAttendanceBySchoolId({
      schoolId: schoolId,
    });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

module.exports = { createAttendance, getAttendanceBySchoolId };
