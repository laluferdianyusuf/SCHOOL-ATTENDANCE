const StudentService = require("../services/studentsService");

const addStudent = async (req, res) => {
  const {
    name,
    studentId,
    classroom,
    parentName,
    job,
    relationship,
    parentPhone,
    fingerprint,
  } = req.body;
  const school = req.admins.schoolId;

  const { status, status_code, message, data } =
    await StudentService.addStudent({
      name,
      studentId,
      schoolId: school,
      classroom,
      parentName,
      job,
      relationship,
      parentPhone,
      fingerprint,
    });

  res
    .status(status_code)
    .send({ status: status, message: message, data: data });
};

const getStudents = async (req, res, next) => {
  const schoolId = req.admins.schoolId;

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

module.exports = { addStudent, getStudents };
