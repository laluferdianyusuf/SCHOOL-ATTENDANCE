const AttendanceRepository = require("../repositories/attendanceRepository");
const StudentRepository = require("../repositories/studentsRepository");
const twilio = require("twilio");

const accountSid = "AC1d2085c9639567bad0bedeb2953f67cc";
const authToken = "f73574b8de5ad169903cc695df25412f";
const client = twilio(accountSid, authToken);
class AttendanceService {
  static async createAttendance({ studentId }) {
    try {
      const getStudent = await StudentRepository.getStudentFingerprint({
        id: studentId,
      });

      if (getStudent) {
        const createAttendance = await AttendanceRepository.createAttendance({
          present: "present",
          studentId: studentId,
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
      } else {
        return {
          status: false,
          status_code: 404,
          message: "Fingerprint not found",
          data: { attendance: null },
        };
      }
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
