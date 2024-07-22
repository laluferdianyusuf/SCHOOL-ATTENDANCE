const SchoolService = require("../services/schoolService");

const addSchool = async (req, res) => {
  const { name, address, phone } = req.body;

  const { status, status_code, message, data } = await SchoolService.addSchool({
    name,
    address,
    phone,
  });

  res
    .status(status_code)
    .send({ status: status, message: message, data: data });
};

const getAllSchools = async (req, res) => {
  const { status, status_code, message, data } =
    await SchoolService.getAllSchools();

  res
    .status(status_code)
    .send({ status: status, message: message, data: data });
};

module.exports = { addSchool, getAllSchools };
