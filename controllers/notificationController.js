const NotificationService = require("../services/notificationService");

const getNotificationsBySchoolId = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await NotificationService.getNotificationsBySchoolId({ schoolId: id });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const getNotificationsById = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await NotificationService.getNotificationsById({ id: id });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

const updateNotifications = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } =
    await NotificationService.updateNotification({ id });

  res.status(status_code).send({
    status: status,
    status_code: status_code,
    message: message,
    data: data,
  });
};

module.exports = {
  getNotificationsBySchoolId,
  getNotificationsById,
  updateNotifications,
};
