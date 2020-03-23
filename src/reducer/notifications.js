import {
  NEW_NOTIFICATIONS,
  NOTIFICATION_DETAILS,
  ALL_NOTIFICATIONS,
  READ_NOTIFICATIONS,NEW_NOTIFICATIONS_COUNT
} from "../actions/type";
const initialState = {
  allNotifications: {
    allNotifications: {}
  },
  newNotificationsCount:0,
  unreadNotification: {
    unreadNotifications: [],
    allNotificationsCount:0,
    readNotificationsCount:0
  },
  readNotification: {
    notifications: {}
  },
  viewNotificationDetails: {
    notificationDetails: {}
  },
  unreadNotificationsCount: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_NOTIFICATIONS:
      return {
        ...state,
        unreadNotification: action.unreadNotificationsPlusCount
      };
    case READ_NOTIFICATIONS:
      return { ...state, readNotification: action.readNotificationsPlusCount };
    case NOTIFICATION_DETAILS:
      return {
        ...state,
        viewNotificationDetails: action.notificationsDetailsPlusCount
      };
    case ALL_NOTIFICATIONS:
      return { ...state, allNotifications: action.allNotificationsPlusCount };
      case NEW_NOTIFICATIONS_COUNT:
        return { ...state, newNotificationsCount: action.newNotificationsCount };
    default:
      return state;
  }
};
