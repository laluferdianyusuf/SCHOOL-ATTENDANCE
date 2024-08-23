const AdminService = require("../services/adminService");

const register = async (req, res) => {
  const { name, username, email, password, role, schoolId } = req.body;

  const { status, status_code, message, data } = await AdminService.Register({
    name,
    username,
    email,
    password,
    role,
    schoolId,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const registerParent = async (req, res) => {
  const { name, username, email, password, role, schoolId, studentId } =
    req.body;

  const { status, status_code, message, data } =
    await AdminService.RegisterParent({
      name,
      username,
      email,
      password,
      role,
      schoolId,
      studentId,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const login = async (req, res, next) => {
  const { username, password, schoolId } = req.body;

  const { status, status_code, message, data, token } =
    await AdminService.Login({
      username,
      password,
      schoolId,
    });

  res
    .status(status_code)
    .send({ status: status, message: message, data: data, token: token });
};

const loginParent = async (req, res, next) => {
  const { username, password, schoolId, studentId } = req.body;

  const { status, status_code, message, data, token } =
    await AdminService.LoginParent({
      username,
      password,
      schoolId,
      studentId,
    });

  res
    .status(status_code)
    .send({ status: status, message: message, data: data, token: token });
};

const currentUser = async (req, res) => {
  const currentUser = req.admins;

  res.status(200).send({
    status: true,
    message: "You are logged in with this user",
    data: currentUser,
  });
};

const getAdminBySchoolId = async (req, res, next) => {
  const { schoolId } = req.admins;

  const { status, status_code, message, data } =
    await AdminService.getAdminBySchoolId({ schoolId: schoolId });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = {
  register,
  login,
  getAdminBySchoolId,
  currentUser,
  registerParent,
  loginParent,
};
