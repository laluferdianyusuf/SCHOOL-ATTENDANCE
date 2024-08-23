const StudentService = require("../services/studentsService");

const addStudent = async (req, res) => {
  const { name, classroom } = req.body;
  const { id } = req.params;

  const { status, status_code, message, data } =
    await StudentService.addStudent({
      name,
      schoolId: id,
      classroom,
    });

  res
    .status(status_code)
    .send({ status: status, message: message, data: data });
};

const getStudents = async (req, res, next) => {
  const { schoolId } = req.params;

  const { status, status_code, message, data } =
    await StudentService.findStudent({
      schoolId: schoolId,
    });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateStudent = async (req, res, next) => {
  const { id } = req.params;

  const { name, classroom, parentName, job, relationship, parentPhone } =
    req.body;
  const { status, status_code, message, data } =
    await StudentService.updateStudent({
      id,
      name,
      classroom,
      parentName,
      job,
      relationship,
      parentPhone,
    });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const { status, status_code, message, data } =
    await StudentService.deleteStudent({ id });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const getStudentById = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await StudentService.getStudentById({ id });
  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

module.exports = {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getStudentById,
};
