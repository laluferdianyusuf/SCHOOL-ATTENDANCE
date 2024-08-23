const SchoolRepository = require("../repositories/schoolRepository");

class SchoolService {
  static async addSchool({ name, address, phone }) {
    try {
      if (!name || !address || !phone) {
        return {
          status: false,
          status_code: 400,
          message: "Fields name cannot be empty",
          data: null,
        };
      }

      const getSchool = await SchoolRepository.getSchoolByName({ name });

      if (getSchool) {
        return {
          status: false,
          status_code: 400,
          message: `School with name ${getSchool.name} already exists`,
          data: null,
        };
      } else {
        const addSchool = await SchoolRepository.addSchool({
          name,
          address,
          phone,
        });
        return {
          status: true,
          status_code: 201,
          message: `School with name ${addSchool.name} successfully added`,
          data: addSchool,
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

  static async getAllSchools() {
    try {
      const getSchool = await SchoolRepository.getAllSchools();

      if (getSchool) {
        return {
          status: true,
          status_code: 201,
          message: "School has been updated",
          data: getSchool,
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "No school found",
          data: null,
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: "error: " + error,
        data: null,
      };
    }
  }

  static async getSchoolById({ id }) {
    try {
      const getSchool = await SchoolRepository.getSchoolById({ id });

      if (getSchool) {
        return {
          status: true,
          status_code: 200,
          message: "success",
          data: getSchool,
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "not found",
          data: null,
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: "Error: " + error.message,
        data: null,
      };
    }
  }
}

module.exports = SchoolService;
