const AttendanceRepository = require("../repositories/attendanceRepository");
const StudentRepository = require("../repositories/studentsRepository");
const twilio = require("twilio");

const accountSid = "ACc668cfbe01ed2c160dcffc2bbf3fbe8e";
const authToken = "89829415ba6eaa2eacb3dccca50d8435";
const client = twilio(accountSid, authToken);
class AttendanceService {
  static async createAttendance({ studentId }) {
    try {
      // const getStudent = await StudentRepository.getStudentFingerprint({
      //   id: studentId,
      // });
      const parseDataId = studentId.split("&")[0];
      const parseDataTime = studentId.split("&")[1];

      const createAttendance = await AttendanceRepository.createAttendance({
        present: "present",
        studentId: parseDataId,
        timestamp: parseDataTime,
      });

      if (createAttendance) {
        const message = `Your child ${getStudent.name} have been attendance at ${getStudent.createdAt}.`;

        await client.messages.create({
          body: message,
          from: "whatsapp:+14155238886",
          to: `whatsapp:${getStudent.parentPhone}`,
        });

        return {
          status: true,
          status_code: 201,
          message:
            "Your attendance has been recorded and notification sent to parent",
          data: { attendance: createAttendance },
        };
      } else {
        return {
          status: true,
          status_code: 201,
          message:
            "Your attendance has been recorded but no parent found to notify",
          data: { attendance: createAttendance },
        };
      }
      // if (getStudent) {
      // } else {
      //   return {
      //     status: false,
      //     status_code: 404,
      //     message: "Fingerprint not found",
      //     data: { attendance: null },
      //   };
      // }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error,
        data: { attendance: null },
      };
    }
  }
}

module.exports = AttendanceService;
