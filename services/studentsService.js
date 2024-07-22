const StudentRepository = require("../repositories/studentsRepository");
const SchoolRepository = require("../repositories/schoolRepository");

class StudentService {
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
    try {
      if (
        !name ||
        !studentId ||
        !schoolId ||
        !classroom ||
        !parentName ||
        !job ||
        !relationship ||
        !parentPhone ||
        !fingerprint
      ) {
        return {
          status: false,
          status_code: 400,
          message: "Fields name cannot be empty",
          data: {
            student: null,
          },
        };
      }

      const getStudent = await StudentRepository.getStudentByName({ name });
      const getSchool = await SchoolRepository.getSchoolById({ schoolId });
      if (!getSchool) {
        return {
          status: false,
          status_code: 404,
          message: "School not found",
          data: {
            student: null,
          },
        };
      } else {
        const addStudent = await StudentRepository.addStudent({
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
        return {
          status: true,
          status_code: 201,
          message: `Student with name ${addStudent.name} successfully added`,
          data: {
            student: addStudent,
          },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          student: null,
        },
      };
    }
  }

  static async findStudent({ schoolId }) {
    try {
      const getStudent = await StudentRepository.getStudentBySchoolId({
        schoolId,
      });

      if (getStudent) {
        return {
          status: true,
          status_code: 200,
          message: "Successfully found",
          data: { student: getStudent },
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "Not found",
          data: { student: null },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: { student: null },
      };
    }
  }
}

module.exports = StudentService;
