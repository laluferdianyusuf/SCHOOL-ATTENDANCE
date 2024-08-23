const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = 2500;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Successfully",
  });
});

const upload = require("./multer/multer");

// controllers
const AdminController = require("./controllers/adminController");
const SchoolController = require("./controllers/schoolController");
const StudentController = require("./controllers/studentsController");
const AttendanceController = require("./controllers/attendanceController");
const TeacherController = require("./controllers/teachersController");
const NewsController = require("./controllers/newsController");
const NotificationController = require("./controllers/notificationController");

// middlewares
const middlewares = require("./middlewares/adminMiddleware");

// routes API
// user / admin
app.post("/api/v7/register", AdminController.register);
app.post("/api/v7/register/parent", AdminController.registerParent);
app.post("/api/v7/login", AdminController.login);
app.post("/api/v7/login/parent", AdminController.loginParent);
app.get(
  "/api/v7/list/admin",
  middlewares.authenticate,
  AdminController.getAdminBySchoolId
);
app.get(
  "/api/v7/current/user",
  middlewares.authenticate,
  AdminController.currentUser
);

// school
app.post("/api/v1/add/school", SchoolController.addSchool);
app.get("/api/v1/list/schools", SchoolController.getAllSchools);
app.get("/api/v1/list/schools/:id", SchoolController.getAllSchools);

// student
app.post(
  "/api/v2/add/student/:id",
  // middlewares.authenticate,
  StudentController.addStudent
);
app.get(
  "/api/v2/list/students/:schoolId",
  // middlewares.authenticate,
  StudentController.getStudents
);
app.put(
  "/api/v2/update/student/:id",
  // middlewares.authenticate,
  StudentController.updateStudent
);
app.delete(
  "/api/v2/delete/student/:id",
  // middlewares.authenticate,
  StudentController.deleteStudent
);
app.get(
  "/api/v2/list/students/:id",
  // middlewares.authenticate,
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

// news
app.post(
  "/api/v5/create/news/:id",
  upload.single("image"),
  NewsController.createNews
);
app.get("/api/v5/read/news/school/:id", NewsController.getNewsBySchoolId);
app.put(
  "/api/v5/update/news/:id",
  upload.single("image"),
  NewsController.updateNews
);
app.delete("/api/v5/delete/news/:id", NewsController.deleteNews);
app.get("/api/v5/read/news/:id", NewsController.getNewsById);

// notifications
app.get(
  "/api/v6/notifications/school/:id",
  NotificationController.getNotificationsBySchoolId
);
app.get(
  "/api/v6/notifications/:id",
  NotificationController.getNotificationsById
);
app.put(
  "/api/v6/notification/open/:id",
  NotificationController.updateNotifications
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on http://localhost:${PORT}`);
});
