import axios from "axios";
import {
  NEW_NOTIFICATIONS,
  NOTIFICATION_DETAILS,
  ALL_NOTIFICATIONS,
  READ_NOTIFICATIONS,NEW_NOTIFICATIONS_COUNT,MARK_ALL_NOTIFICATIONS
} from "../actions/type";
const url = "https://bislink.herokuapp.com/api/user/notifications";

export function fetchAllNewNotifications() {
  return dispatch =>
    axios.get(`${url}`).then(response => {
      const {
        unreadNotifications,
        allNotificationsCount,
        readNotificationsCount
      } = response.data;
      const unreadNotificationsPlusCount = {
        unreadNotifications,
        allNotificationsCount,
        readNotificationsCount
      };
      dispatch({
        type: NEW_NOTIFICATIONS,
        unreadNotificationsPlusCount
      });
    });
}
export function fetchAllReadNotifications() {
  return dispatch =>
    axios.get(`${url}/seen`).then(response => {
      const {
        unreadNotificationsCount,
        allNotificationsCount,
        readNotifications
      } = response.data;
      const readNotificationsPlusCount = {
        unreadNotificationsCount,
        allNotificationsCount,
        readNotifications
      };
      dispatch({
        type: READ_NOTIFICATIONS,
        readNotificationsPlusCount
      });
    });
}
export function fetchSingleNotification(notificationId) {
  return dispatch =>
    axios.get(`${url}/${notificationId}`).then(response => {
      const {
        notification,
        unreadNotificationsCount,
        allNotificationsCount,
        readNotificationsCount
      } = response.data;
      const notificationsDetailsPlusCount = {
        notification,
        unreadNotificationsCount,
        allNotificationsCount,
        readNotificationsCount
      };
      dispatch({
        type: NOTIFICATION_DETAILS,
        notificationsDetailsPlusCount
      });
    });
}
export function fetchAllNotifications() {
  return dispatch =>
    axios.get(`${url}/all`).then(response => {
      const {
        allNotifications,
        newNotificationsCount,
        readNotificationsCount
      } = response.data;
      const allNotificationsPlusCount = {
        allNotifications,
        newNotificationsCount,
        readNotificationsCount
      };
      dispatch({
        type: ALL_NOTIFICATIONS,
        allNotificationsPlusCount
      });
    });
}
export function fetchNewNotificationsCount() {
  return dispatch =>
    axios.get(`${url}/all`).then(response => {
      const {
        newNotificationsCount
      } = response.data;
      dispatch({
        type: NEW_NOTIFICATIONS_COUNT,
        newNotificationsCount
      });
    });
}
