const { news } = require("../models");

class NewsRepository {
  static async createNews({ title, description, category, image, schoolId }) {
    const createNews = await news.create({
      title,
      description,
      category,
      image,
      schoolId,
    });

    return createNews;
  }

  static async getNewsBySchoolId({ schoolId }) {
    const getSchool = await news.findAll({
      where: { schoolId: schoolId },
      order: [["createdAt", "DESC"]],
    });
    return getSchool;
  }

  static async updateNews({ id, title, description, image }) {
    const updateNews = await news.update(
      { title, description, image },
      {
        where: {
          id: id,
        },
      }
    );
    return updateNews;
  }

  static async deleteNews({ id }) {
    const deleteNews = await news.destroy({ where: { id: id } });
    return deleteNews;
  }

  static async getNewsById({ id }) {
    const getNews = await news.findOne({ where: { id: id } });
    return getNews;
  }
}

module.exports = NewsRepository;
