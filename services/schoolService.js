const SchoolRepository = require("../repositories/schoolRepository");

class SchoolService {
  static async addSchool({ name, address, phone }) {
    try {
      if (!name || !address || !phone) {
        return {
          status: false,
          status_code: 400,
          message: "Fields name cannot be empty",
          data: {
            schools: null,
          },
        };
      }

      const getSchool = await SchoolRepository.getSchoolByName({ name });

      if (getSchool) {
        return {
          status: false,
          status_code: 400,
          message: `School with name ${getSchool.name} already exists`,
          data: {
            schools: null,
          },
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
          data: {
            schools: addSchool,
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
          schools: null,
        },
      };
    }
  }
  static async getAllSchools() {
    try {
      const getSchool = await SchoolRepository.getAllSchools();

      if (getSchool && getSchool.length > 0) {
        return {
          status: true,
          status_code: 201,
          message: "School has been updated",
          data: {
            schools: getSchool,
          },
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "No school found",
          data: {
            schools: null,
          },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: "error: " + error,
        data: {
          schools: null,
        },
      };
    }
  }
}

module.exports = SchoolService;
