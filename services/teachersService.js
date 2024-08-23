const TeacherRepository = require("../repositories/teachersRepository");
const SchoolRepository = require("../repositories/schoolRepository");

class TeacherService {
  static async createTeacher({
    name,
    address,
    born,
    gender,
    religion,
    nip,
    schoolId,
  }) {
    try {
      if (
        !name ||
        !address ||
        !born ||
        !gender ||
        !religion ||
        !nip ||
        !schoolId
      ) {
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
        const createTeacher = await TeacherRepository.createTeacher({
          name,
          address,
          born,
          gender,
          religion,
          nip,
          schoolId,
        });
        return {
          status: true,
          status_code: 201,
          message: `Teacher with name ${createTeacher.name} successfully added`,
          data: createTeacher,
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

  static async updateTeacher({
    id,
    name,
    address,
    born,
    gender,
    religion,
    nip,
  }) {
    try {
      const updateTeacher = await TeacherRepository.updateTeacher({
        id,
        name,
        address,
        born,
        gender,
        religion,
        nip,
      });

      return {
        status: true,
        status_code: 201,
        message: "Successfully updated teacher",
        data: updateTeacher,
      };
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "Error updating teacher: " + error.message,
        data: null,
      };
    }
  }

  static async getTeacherBySchoolId({ schoolId }) {
    try {
      const getTeacher = await TeacherRepository.getTeachersBySchoolId({
        schoolId,
      });

      if (getTeacher) {
        return {
          status: true,
          status_code: 200,
          message: "Successfully found",
          data: getTeacher,
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

  static async deleteTeacher({ id }) {
    try {
      const deleteTeacher = await TeacherRepository.deleteTeacher({ id });
      return {
        status: true,
        status_code: 200,
        message: "Teacher deleted",
        data: deleteTeacher,
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

  static async getTeacherById({ id }) {
    try {
      const getTeacher = await TeacherRepository.getTeacherById({ id });
      if (getTeacher) {
        return {
          status: true,
          status_code: 200,
          message: "Teacher retrieved",
          data: getTeacher,
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "teacher not found",
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

module.exports = TeacherService;
