const AdminRepository = require("../repositories/adminRepository");
const SchoolRepository = require("../repositories/schoolRepository");
const bcrypt = require("bcrypt");
const { JWT, ROLES } = require("../lib/const");
const jwt = require("jsonwebtoken");
const StudentRepository = require("../repositories/studentsRepository");

class AdminService {
  static async Register({ name, username, email, password, schoolId }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "name is required",
          data: null,
        };
      }

      if (!username) {
        return {
          status: false,
          status_code: 400,
          message: "username is required",
          data: null,
        };
      }
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "email is required",
          data: null,
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password is required",
          data: null,
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "password must be at least 8 characters",
          data: null,
        };
      }

      if (!schoolId) {
        return {
          status: false,
          status_code: 400,
          message: "School is required",
          data: null,
        };
      }

      const findEmail = await AdminRepository.findAdminByEmail({ email });
      if (findEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email address has already been registered",
          data: null,
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, JWT.SALT_ROUND);
        const registeredAdmin = await AdminRepository.createAdmin({
          name,
          username,
          email,
          password: hashedPassword,
          role: ROLES.GURU,
          schoolId: parseInt(schoolId),
        });
        return {
          status: true,
          status_code: 201,
          message: "Admin successfully registered",
          data: registeredAdmin,
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

  static async RegisterParent({
    name,
    username,
    email,
    password,
    schoolId,
    studentId,
  }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "name is required",
          data: null,
        };
      }

      if (!username) {
        return {
          status: false,
          status_code: 400,
          message: "username is required",
          data: null,
        };
      }
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "email is required",
          data: null,
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password is required",
          data: null,
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "password must be at least 8 characters",
          data: null,
        };
      }

      if (!schoolId) {
        return {
          status: false,
          status_code: 400,
          message: "School is required",
          data: null,
        };
      }

      if (!studentId) {
        return {
          status: false,
          status_code: 400,
          message: "Student is required",
          data: null,
        };
      }

      const getStudentById = await StudentRepository.getStudentById({
        id: studentId,
      });

      if (getStudentById) {
        return {
          status: false,
          status_code: 400,
          message: "Student is already chosen",
          data: null,
        };
      }

      const findEmail = await AdminRepository.findAdminByEmail({ email });
      if (findEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email address has already been registered",
          data: null,
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, JWT.SALT_ROUND);
        const registeredAdmin = await AdminRepository.createAdmin({
          name,
          username,
          email,
          password: hashedPassword,
          role: ROLES.PARENT,
          schoolId: parseInt(schoolId),
          studentId: parseInt(studentId),
        });
        return {
          status: true,
          status_code: 201,
          message: "Parent successfully registered",
          data: registeredAdmin,
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

  static async Login({ username, password, schoolId }) {
    try {
      if (!username) {
        return {
          status: false,
          status_code: 400,
          message: "Username are required",
          data: null,
          token: null,
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password are required",
          data: null,
          token: null,
        };
      }
      if (!schoolId) {
        return {
          status: false,
          status_code: 400,
          message: "school are required",
          data: null,
          token: null,
        };
      }
      const getAdmin = await AdminRepository.getAdminByUsername({ username });
      const getSchool = await SchoolRepository.getSchoolById({ schoolId });

      if (getAdmin.schoolId !== parseInt(schoolId)) {
        return {
          status: false,
          status_code: 400,
          message: "Wrong school",
          data: null,
        };
      }

      if (!getAdmin) {
        return {
          status: false,
          status_code: 202,
          message: "Invalid Username, try again",
          data: null,
          token: null,
        };
      }

      if (getAdmin.role !== "admin") {
        if (!getSchool) {
          return {
            status: false,
            status_code: 404,
            message: "School Not Found",
            data: null,
            data: null,
          };
        }

        if (getAdmin.schoolId !== getSchool.id) {
          return {
            status: false,
            status_code: 403,
            message: "Your account is not registered in this school",
            data: null,
            token: null,
          };
        }

        if (getAdmin.role !== "teacher") {
          return {
            status: false,
            status_code: 403,
            message: "You do not have permission to log in",
            data: null,
            token: null,
          };
        }
      }

      const isPasswordValid = await bcrypt.compare(password, getAdmin.password);
      if (!isPasswordValid) {
        return {
          status: false,
          status_code: 202,
          message: "Invalid password, try again",
          data: null,
          token: null,
        };
      }

      const token = await jwt.sign(
        {
          id: getAdmin.id,
          name: getAdmin.name,
          username: getAdmin.username,
          email: getAdmin.email,
          schoolId: getAdmin.schoolId,
        },
        JWT.SECRET
      );

      return {
        status: true,
        status_code: 200,
        message: "Your account is registered",
        data: getAdmin,
        token: token,
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: null,
        token: null,
      };
    }
  }

  static async LoginParent({ username, password, schoolId, studentId }) {
    try {
      if (!username) {
        return {
          status: false,
          status_code: 400,
          message: "Username are required",
          data: null,
          token: null,
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password are required",
          data: null,
          token: null,
        };
      }
      if (!schoolId) {
        return {
          status: false,
          status_code: 400,
          message: "school are required",
          data: null,
          token: null,
        };
      }
      if (!studentId) {
        return {
          status: false,
          status_code: 400,
          message: "student are required",
          data: null,
          token: null,
        };
      }

      const getAdmin = await AdminRepository.getAdminByUsername({ username });
      const getSchool = await SchoolRepository.getSchoolById({ schoolId });

      if (getAdmin.schoolId !== parseInt(schoolId)) {
        return {
          status: false,
          status_code: 400,
          message: "Wrong school",
          data: null,
        };
      }
      if (getAdmin.studentId !== parseInt(studentId)) {
        return {
          status: false,
          status_code: 400,
          message: "Wrong child",
          data: null,
        };
      }

      if (!getAdmin) {
        return {
          status: false,
          status_code: 202,
          message: "Invalid Username, try again",
          data: null,
          token: null,
        };
      }

      if (getAdmin.role !== "admin") {
        if (!getSchool) {
          return {
            status: false,
            status_code: 404,
            message: "School Not Found",
            data: null,
            token: null,
          };
        }

        if (getAdmin.schoolId !== getSchool.id) {
          return {
            status: false,
            status_code: 403,
            message: "Your account is not registered in this school",
            data: null,
            token: null,
          };
        }

        if (getAdmin.role !== "parent") {
          return {
            status: false,
            status_code: 403,
            message: "You do not have permission to log in",
            data: null,
            token: null,
          };
        }
      }

      const isPasswordValid = await bcrypt.compare(password, getAdmin.password);
      if (!isPasswordValid) {
        return {
          status: false,
          status_code: 202,
          message: "Invalid password, try again",
          data: null,
          token: null,
        };
      }

      const token = await jwt.sign(
        {
          id: getAdmin.id,
          name: getAdmin.name,
          username: getAdmin.username,
          email: getAdmin.email,
          schoolId: getAdmin.schoolId,
        },
        JWT.SECRET
      );

      return {
        status: true,
        status_code: 200,
        message: "Your account is registered",
        data: getAdmin,
        token: token,
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: null,
        token: null,
      };
    }
  }

  static async getAdminBySchoolId({ schoolId }) {
    try {
      const getAdmin = await AdminRepository.getAdminBySchoolId({
        schoolId,
      });

      if (getAdmin) {
        return {
          status: true,
          status_code: 200,
          message: "Successfully found",
          data: getAdmin,
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
}

module.exports = AdminService;
