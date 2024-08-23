const {
  notifications,
  admins,
  attendances,
  schools,
  students,
} = require("../models");

class NotificationRepository {
  static async createNotifications({
    description,
    schoolId,
    studentId,
    attendanceId,
    isOpened,
  }) {
    const createNotifications = await notifications.create({
      description,
      schoolId,
      studentId,
      attendanceId,
      isOpened,
    });
    return createNotifications;
  }

  static async getNotificationsBySchoolId({ schoolId }) {
    const getNotifications = await notifications.findAll({
      where: { schoolId: schoolId },
      include: [
        { model: attendances, attributes: ["createdAt"] },
        { model: schools, attributes: ["name"] },
        { model: students, attributes: ["name"] },
      ],
    });
    return getNotifications;
  }

  static async getNotificationsByUserId({ userId }) {
    const getNotifications = await notifications.findAll(
      { where: { userId: userId } },
      {
        include: [
          { model: admins, attributes: ["name"] },
          { model: attendances, attributes: ["createdAt"] },
          { model: schools, attributes: ["name"] },
          { model: students, attributes: ["name"] },
        ],
      }
    );
    return getNotifications;
  }

  static async getNotificationsById({ id }) {
    const getNotifications = await notifications.findOne({ where: { id: id } });
    return getNotifications;
  }

  static async updateNotificationsOpened({ id, isOpened }) {
    const updateNotification = await notifications.update(
      { isOpened: isOpened },
      { where: { id: id } }
    );

    return updateNotification;
  }
}
module.exports = NotificationRepository;
