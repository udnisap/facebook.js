
/**
 * Notifications API
 */
const notifications = () => {
  var fb_notifications      = require('NotificationStore');
  var unread = {
    /**
     * This is a async request. callback will be called with unread notifications.
     * @param callback function
     */
    list: fb_notifications.getAll,
    /**
     * Get unread notification count
     * @returns {int}
     */
    count: fb_notifications.getCount
  }, read = {};

  return{
    unread: unread,
    read: read
  }
}();

