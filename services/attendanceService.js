const AttendanceRepository = require("../repositories/attendanceRepository");
const StudentRepository = require("../repositories/studentsRepository");
const NotificationRepository = require("../repositories/notificationRepository");
const AdminRepository = require("../repositories/adminRepository");

class AttendanceService {
  static async createAttendance({ studentId, timestamp }) {
    try {
      const getStudent = await StudentRepository.getStudentById({
        id: studentId,
      });

      if (getStudent) {
        const createAttendance = await AttendanceRepository.createAttendance({
          present: "present",
          studentId: parseInt(studentId),
          schoolId: getStudent.schoolId,
          timestamp: timestamp,
        });

        if (createAttendance) {
          const getAdminByStudentId = await AdminRepository.getAdminByStudentId(
            { studentId }
          );
          const notificationDescriptions = `Attendance recorded for student ${getStudent.name} on ${createAttendance.timestamp}. Status: ${createAttendance.present}`;

          await NotificationRepository.createNotifications({
            userId: getAdminByStudentId.id,
            description: notificationDescriptions,
            schoolId: getStudent.schoolId,
            studentId: studentId,
            attendanceId: createAttendance.id,
            isOpened: false,
          });
          return {
            status: true,
            status_code: 201,
            message:
              "Your attendance has been recorded and notification sent to parent",
            data: createAttendance,
          };
        } else {
          return {
            status: true,
            status_code: 201,
            message: "Your attendance not recorded",
            data: null,
          };
        }
      } else {
        return {
          status: false,
          status_code: 404,
          message: "Student not found",
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "error occurred" + error.message,
        data: null,
      };
    }
  }

  static async getAttendanceBySchoolId({ schoolId }) {
    try {
      const getAttendance = await AttendanceRepository.getAttendanceBySchoolId({
        schoolId,
      });
      if (getAttendance) {
        return {
          status: true,
          status_code: 200,
          message: "Attendance retrieved",
          data: getAttendance,
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "Attendance not found",
          data: null,
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: "Error" + error.message,
        data: null,
      };
    }
  }
}

module.exports = AttendanceService;
