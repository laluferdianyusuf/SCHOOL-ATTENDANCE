const NewsService = require("../services/newsService");

const createNews = async (req, res) => {
  const { title, description, category } = req.body;
  const { id } = req.params;

  const imageUrl = `/uploads/${req.file.filename}`;
  const { status, status_code, message, data } = await NewsService.createNews({
    title: title,
    description: description,
    category: category,
    image: imageUrl,
    schoolId: id,
  });
  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const getNewsBySchoolId = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await NewsService.getNewsBySchoolId({
      schoolId: id,
    });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const updateNews = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  console.log(req.file);

  const imageUrl = `/uploads/${req.file.filename}`;

  const { status, status_code, message, data } = await NewsService.updateNews({
    id: id,
    title: title,
    description: description,
    image: imageUrl,
  });
  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const deleteNews = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await NewsService.deleteNews({
    id: id,
  });
  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const getNewsById = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await NewsService.getNewsById({
    id: id,
  });
  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

module.exports = {
  createNews,
  getNewsBySchoolId,
  updateNews,
  deleteNews,
  getNewsById,
};
