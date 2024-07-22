const AdminRepository = require("../repositories/adminRepository");
const SchoolRepository = require("../repositories/schoolRepository");
const bcrypt = require("bcrypt");
const { JWT, ROLES } = require("../lib/const");
const jwt = require("jsonwebtoken");

class AdminService {
  static async Register({ name, username, email, password, role, schoolId }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "name is required",
          data: {
            admin: null,
          },
        };
      }

      if (!username) {
        return {
          status: false,
          status_code: 400,
          message: "username is required",
          data: {
            admin: null,
          },
        };
      }
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "email is required",
          data: {
            admin: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "password is required",
          data: {
            admin: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "password must be at least 8 characters",
          data: {
            admin: null,
          },
        };
      }

      if (!schoolId) {
        return {
          status: false,
          status_code: 400,
          message: "School is required",
          data: {
            admin: null,
          },
        };
      }

      const findEmail = await AdminRepository.findAdminByEmail({ email });
      if (findEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email address has already been registered",
          data: {
            admin: null,
          },
        };
      } else {
        const hashedPassword = await bcrypt.hash(password, JWT.SALT_ROUND);
        const registeredAdmin = await AdminRepository.createAdmin({
          name,
          username,
          email,
          password: hashedPassword,
          role: ROLES.GURU,
          schoolId,
        });
        return {
          status: true,
          status_code: 201,
          message: "Admin successfully registered",
          data: {
            admin: registeredAdmin,
          },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          admin: null,
        },
      };
    }
  }

  static async Login({ username, password, schoolId }) {
    try {
      if (!username || !password || !schoolId) {
        return {
          status: false,
          status_code: 400,
          message: "All fields are required",
          admin: null,
        };
      }

      const getAdmin = await AdminRepository.getAdminByUsername({ username });
      if (!getAdmin) {
        return {
          status: false,
          status_code: 401,
          message: "Invalid Username, try again",
          data: {
            admin: null,
          },
        };
      }

      if (getAdmin.role !== "admin") {
        const getSchool = await SchoolRepository.getSchoolById({ schoolId });
        if (!getSchool) {
          return {
            status: false,
            status_code: 404,
            message: "School Not Found",
            data: {
              admin: null,
            },
          };
        }

        if (getAdmin.schoolId !== getSchool.id) {
          return {
            status: false,
            status_code: 401,
            message: "Your account is not registered in this school",
            data: {
              admin: null,
            },
          };
        }

        if (getAdmin.role !== "guru") {
          return {
            status: false,
            status_code: 403,
            message: "You do not have permission to log in",
            data: {
              admin: null,
            },
          };
        }
      }

      const isPasswordValid = await bcrypt.compare(password, getAdmin.password);
      if (!isPasswordValid) {
        return {
          status: false,
          status_code: 401,
          message: "Invalid password, try again",
          data: {
            admin: null,
          },
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
        JWT.SECRET,
        { expiresIn: "1h" }
      );

      return {
        status: true,
        status_code: 200,
        message: "Your account is registered",
        data: {
          admin: { admin: getAdmin, token },
        },
      };
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          admin: null,
        },
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
          data: { admin: getAdmin },
        };
      } else {
        return {
          status: false,
          status_code: 404,
          message: "Not found",
          data: { admin: null },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: { admin: null },
      };
    }
  }
}

module.exports = AdminService;
