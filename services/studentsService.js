const StudentRepository = require("../repositories/studentsRepository");
const SchoolRepository = require("../repositories/schoolRepository");

class StudentService {
  static async addStudent({ name, schoolId, classroom }) {
    try {
      if (!name || !schoolId || !classroom) {
        return {
          status: false,
          status_code: 400,
          message: "Fields name cannot be empty",
          data: null,
        };
      }

      const getSchool = await SchoolRepository.getSchoolById({ schoolId });
      if (!getSchool) {
        return {
          status: false,
          status_code: 404,
          message: "School not found",
          data: null,
        };
      } else {
        const addStudent = await StudentRepository.addStudent({
          name,
          schoolId,
          classroom,
        });
        return {
          status: true,
          status_code: 201,
          message: `Student with name ${addStudent.name} successfully added`,
          data: addStudent,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: null,
      };
    }
  }

  static async updateStudent({
    id,
    name,
    classroom,
    parentName,
    job,
    relationship,
    parentPhone,
  }) {
    try {
      if (!parentName) {
        return {
          status: false,
          status_code: 400,
          message: "Parent name is required",
          data: null,
        };
      }
      if (!job) {
        return {
          status: false,
          status_code: 400,
          message: "Parent job is required",
          data: null,
        };
      }
      if (!relationship) {
        return {
          status: false,
          status_code: 400,
          message: "Relationship is required",
          data: null,
        };
      }
      if (!parentPhone) {
        return {
          status: false,
          status_code: 400,
          message: "Parent phone is required",
          data: null,
        };
      }

      const updateStudent = await StudentRepository.updateStudent({
        id,
        name,
        classroom,
        parentName,
        job,
        relationship,
        parentPhone,
      });

      return {
        status: true,
        status_code: 201,
        message: "Successfully updated student",
        data: updateStudent,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "Error updating student: " + error.message,
        data: null,
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
          data: getStudent,
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "Not found",
          data: null,
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: null,
      };
    }
  }

  static async deleteStudent({ id }) {
    try {
      const deleteStudent = await StudentRepository.deleteStudent({ id });
      return {
        status: true,
        status_code: 200,
        message: "Student deleted",
        data: deleteStudent,
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: "Error" + error.message,
        data: null,
      };
    }
  }

  static async getStudentById({ id }) {
    try {
      const getStudent = await StudentRepository.getStudentById({ id });
      if (getStudent) {
        return {
          status: true,
          status_code: 200,
          message: "Student retrieved",
          data: getStudent,
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "Student not found",
          data: null,
        };
      }
    } catch (error) {
      return {
        status: true,
        status_code: 200,
        message: "Error getting student" + error.message,
        data: null,
      };
    }
  }
}

module.exports = StudentService;
