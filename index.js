const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 2500;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Berhasil",
  });
});

// controllers
const AdminController = require("./controllers/adminController");
const SchoolController = require("./controllers/schoolController");
const StudentController = require("./controllers/studentsController");
const AttendanceController = require("./controllers/attendanceController");
const TeacherController = require("./controllers/teachersController");

// middlewares
const middlewares = require("./middlewares/adminMiddleware");

// routes API
// user / admin
app.post("/api/v7/register", AdminController.register);
app.post("/api/v7/login", AdminController.login);
app.get(
  "/api/v7/list/admin",
  middlewares.authenticate,
  AdminController.getAdminBySchoolId
);
app.get(
  "/api/v7/current/admin",
  middlewares.authenticate,
  AdminController.currentUser
);

// school
app.post("/api/v1/add/school", SchoolController.addSchool);
app.get("/api/v1/list/schools", SchoolController.getAllSchools);
app.get("/api/v1/list/schools/:id", SchoolController.getAllSchools);

// student
app.post(
  "/api/v2/add/student",
  middlewares.authenticate,
  StudentController.addStudent
);
app.get(
  "/api/v2/list/students",
  middlewares.authenticate,
  StudentController.getStudents
);
app.put(
  "/api/v2/update/student/:id",
  middlewares.authenticate,
  StudentController.updateStudent
);
app.delete(
  "/api/v2/delete/student/:id",
  middlewares.authenticate,
  StudentController.deleteStudent
);
app.get(
  "/api/v2/list/students/:id",
  middlewares.authenticate,
  StudentController.getStudentById
);

// teacher
app.post(
  "/api/v3/add/teacher",
  middlewares.authenticate,
  TeacherController.createTeacher
);
app.get(
  "/api/v3/list/teachers/school",
  middlewares.authenticate,
  TeacherController.getStudentsBySchoolId
);
app.put(
  "/api/v3/update/teacher/:id",
  middlewares.authenticate,
  TeacherController.updateTeacher
);
app.delete(
  "/api/v3/delete/teacher/:id",
  middlewares.authenticate,
  TeacherController.deleteTeacher
);
app.get(
  "/api/v3/list/teachers/:id",
  middlewares.authenticate,
  TeacherController.getTeacherById
);

// attendance
app.post("/api/v4/create/attendance", AttendanceController.createAttendance);
app.get(
  "/api/v4/detail/attendances",
  middlewares.authenticate,
  AttendanceController.getAttendanceBySchoolId
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on http://localhost:${PORT}`);
});
