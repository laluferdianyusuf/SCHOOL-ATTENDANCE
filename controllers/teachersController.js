const TeacherService = require("../services/teachersService");

const createTeacher = async (req, res) => {
  const { name, address, born, gender, religion, nip } = req.body;
  const school = req.admins.schoolId;

  const { status, status_code, message, data } =
    await TeacherService.createTeacher({
      name,
      address,
      born,
      gender,
      religion,
      nip,
      schoolId: school,
    });

  res
    .status(status_code)
    .send({ status: status, message: message, data: data });
};

const getStudentsBySchoolId = async (req, res, next) => {
  const schoolId = req.admins.schoolId;

  const { status, status_code, message, data } =
    await TeacherService.getTeacherBySchoolId({
      schoolId: schoolId,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateTeacher = async (req, res, next) => {
  const { id } = req.params;

  const { name, address, born, gender, religion, nip } = req.body;
  const { status, status_code, message, data } =
    await TeacherService.updateTeacher({
      id,
      name,
      address,
      born,
      gender,
      religion,
      nip,
    });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  const { status, status_code, message, data } =
    await TeacherService.deleteTeacher({ id });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const getTeacherById = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await TeacherService.getTeacherById({ id });
  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

module.exports = {
  createTeacher,
  getStudentsBySchoolId,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
};
