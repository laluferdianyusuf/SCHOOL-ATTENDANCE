const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 1010;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", () => {
  alert("connected");
});

// controller
// admin
const AdminController = require("./controllers/adminController");
// school
const SchoolController = require("./controllers/schoolController");
// student
const StudentController = require("./controllers/studentsController");
// attendance
const AttendanceController = require("./controllers/attendanceController");

// middleware
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

// school
app.post(
  "/api/v1/add/school",
  // middlewares.authenticate,
  // middlewares.isAdmin,
  SchoolController.addSchool
);
app.get("/api/v1/list/schools", SchoolController.getAllSchools);

// student
app.post(
  "/api/v2/add/student",
  middlewares.authenticate,
  // middlewares.isAdmin,
  StudentController.addStudent
);
app.get(
  "/api/v2/list/students",
  middlewares.authenticate,
  StudentController.getStudents
);

// attendance
app.post("/api/v4/create/attendance", AttendanceController.createAttendance);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
