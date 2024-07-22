const AttendanceRepository = require("../repositories/attendanceRepository");
const StudentRepository = require("../repositories/studentsRepository");
const twilio = require("twilio");

const accountSid = "AC2daccc77f82de0500d09b71bc4fb20e7";
const authToken = "015f5e3bf191e10e430935356ea9527e";
const client = twilio(accountSid, authToken);

class AttendanceService {
  static async createAttendance({ studentId, timestamp, fingerprint }) {
    try {
      const getStudent = await StudentRepository.getStudentFingerprint({
        fingerprint,
      });

      if (getStudent) {
        const createAttendance = await AttendanceRepository.createAttendance({
          present: "present",
          timestamp: getStudent.createdAt,
          studentId: studentId,
          schoolId: getStudent.schoolId,
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
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: { attendance: null },
      };
    }
  }
}

module.exports = AttendanceService;
