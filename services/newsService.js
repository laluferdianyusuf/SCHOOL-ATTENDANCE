const NewsRepository = require("../repositories/newsRepository");
const SchoolRepository = require("../repositories/schoolRepository");

class NewsService {
  static async createNews({ title, description, category, image, schoolId }) {
    try {
      if (!title) {
        return {
          status: false,
          status_code: 400,
          message: "Title is required",
          data: null,
        };
      }
      if (!description) {
        return {
          status: false,
          status_code: 400,
          message: "Description is required",
          data: null,
        };
      }
      if (!category) {
        return {
          status: false,
          status_code: 400,
          message: "Category is required",
          data: null,
        };
      }
      if (!image) {
        return {
          status: false,
          status_code: 400,
          message: "Image is required",
          data: null,
        };
      }

      const getSchool = await SchoolRepository.getSchoolById({ schoolId });

      if (!getSchool) {
        return {
          status: false,
          status_code: 404,
          message: "No school found",
          data: null,
        };
      } else {
        const createNews = await NewsRepository.createNews({
          title: title,
          description: description,
          category: category,
          image: image,
          schoolId: schoolId,
        });

        if (createNews) {
          return {
            status: false,
            status_code: 201,
            message: "News created",
            data: createNews,
          };
        }
      }
    } catch (error) {
      console.log(error);

      return {
        status: false,
        status_code: 500,
        message: "Error creating news",
        data: null,
      };
    }
  }

  static async getNewsBySchoolId({ schoolId }) {
    try {
      const getNews = await NewsRepository.getNewsBySchoolId({ schoolId });

      if (!getNews) {
        return {
          status: false,
          status_code: 404,
          message: "No news found",
          data: null,
        };
      } else {
        return {
          status: true,
          status_code: 200,
          message: "News found",
          data: getNews,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "Error getting news",
        data: null,
      };
    }
  }

  static async updateNews({ id, title, description, image }) {
    try {
      if (!title || !description || !image) {
        return {
          status: false,
          status_code: 400,
          message: "All fields are required",
          data: null,
        };
      }
      const getNews = await NewsRepository.getNewsById({ id });

      if (!getNews) {
        return {
          status: false,
          status_code: 404,
          message: "News not found",
          data: null,
        };
      } else {
        const updateNews = await NewsRepository.updateNews({
          id: id,
          title: title,
          description: description,
          image: image,
        });

        if (updateNews) {
          return {
            status: false,
            status_code: 201,
            message: "News updated",
            data: updateNews,
          };
        }
      }
    } catch (error) {
      console.log(error);

      return {
        status: false,
        status_code: 500,
        message: "Error updating news",
        data: null,
      };
    }
  }

  static async deleteNews({ id }) {
    try {
      const getNews = await NewsRepository.getNewsById({ id });

      if (!getNews) {
        return {
          status: false,
          status_code: 404,
          message: "News not found",
          data: null,
        };
      } else {
        const deleteNews = await NewsRepository.deleteNews({ id });
        return {
          status: true,
          status_code: 200,
          message: "News successfully deleted",
          data: deleteNews,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "Error while deleting",
        data: null,
      };
    }
  }

  static async getNewsById({ id }) {
    try {
      const getNewsById = await NewsRepository.getNewsById({ id });
      if (!getNewsById) {
        return {
          status: false,
          status_code: 404,
          message: "News not found",
          data: null,
        };
      } else {
        return {
          status: true,
          status_code: 200,
          message: "News found",
          data: getNewsById,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "Error getting news",
        data: null,
      };
    }
  }
}
module.exports = NewsService;
