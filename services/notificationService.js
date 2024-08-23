const NotificationRepository = require("../repositories/notificationRepository");

class NotificationService {
  static async getNotificationsBySchoolId({ schoolId }) {
    try {
      const getNotifications =
        await NotificationRepository.getNotificationsBySchoolId({ schoolId });

      if (!getNotifications) {
        return {
          status: false,
          status_code: 404,
          message: "Notifications not found",
          data: null,
        };
      } else {
        return {
          status: true,
          status_code: 200,
          message: "Notifications successfully retrieved",
          data: getNotifications,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "Couldn't retrieve notifications",
        data: null,
      };
    }
  }

  static async getNotificationsById({ id }) {
    try {
      const getNotificationsById =
        await NotificationRepository.getNotificationsById({ id });

      if (!getNotificationsById) {
        return {
          status: false,
          status_code: 404,
          message: "Notifications not found",
          data: null,
        };
      } else {
        const updateNotification =
          await NotificationRepository.updateNotificationsOpened({
            id: id,
            isOpened: true,
          });
        return {
          status: true,
          status_code: 200,
          message: "Notifications founded and updated ",
          data: updateNotification,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        status_code: 500,
        message: "Couldn't retrieve notifications",
        data: null,
      };
    }
  }

  static async updateNotification({ id }) {
    try {
      const updateNotification =
        await NotificationRepository.updateNotificationsOpened({
          id: id,
          isOpened: true,
        });

      if (!updateNotification) {
        return {
          status: false,
          status_code: 403,
          message: "Cannot open a notification",
          data: null,
        };
      } else {
        return {
          status: true,
          status_code: 200,
          message: "Notification opened",
          data: updateNotification,
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: "Error" + error.message,
        data: null,
      };
    }
  }
}

module.exports = NotificationService;
