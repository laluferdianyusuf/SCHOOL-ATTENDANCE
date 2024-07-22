const jwt = require("jsonwebtoken");
const { JWT, ROLES } = require("../lib/const");
const AdminRepository = require("../repositories/adminRepository");

const authenticate = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  let token = "";

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).send({
      status: false,
      message: "you are not authorized",
      data: null,
    });
  }

  try {
    const { id } = jwt.verify(token, JWT.SECRET);

    const getAdmin = await AdminRepository.findAdminById({ id });

    req.admins = getAdmin;

    next();
    return;
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: false,
      message: "your section is not authorized",
      data: null,
    });
  }
};

const isGuru = async (req, res, next) => {
  const admin = req.admins;
  if (admin.role === ROLES.GURU) {
    return next();
  }

  return res.status(401).send({
    status: false,
    message: "You do not have permission",
    data: null,
  });
};

const isAdmin = async (req, res, next) => {
  const admin = req.admins;
  if (admin.role === ROLES.ADMIN) {
    return next();
  }

  return res.status(401).send({
    status: false,
    message: "You do not have permission",
    data: null,
  });
};

module.exports = { authenticate, isGuru, isAdmin };
