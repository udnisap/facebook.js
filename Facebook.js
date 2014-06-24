var FB = FB || function () {

  var utils = function () {
    function writeStylesheet(css) {
      var element = document.createElement('style');
      element.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(element);

      if (element.styleSheet) {
        element.styleSheet.cssText = css; // IE
      } else {
        element.innerHTML = css; // Non-IE
      }
    }

    function importJS(src, look_for, onload) {
      var s = document.createElement('script');
      s.setAttribute('type', 'text/javascript');
      s.setAttribute('src', src);
      if (onload) wait_for_script_load(look_for, onload);
      var head = document.getElementsByTagName('head')[0];
      if (head) {
        head.appendChild(s);
      } else {
        document.body.appendChild(s);
      }
    }

    function importCSS(href, look_for, onload) {
      var s = document.createElement('link');
      s.setAttribute('rel', 'stylesheet');
      s.setAttribute('type', 'text/css');
      s.setAttribute('media', 'screen');
      s.setAttribute('href', href);
      if (onload) wait_for_script_load(look_for, onload);
      var head = document.getElementsByTagName('head')[0];
      if (head) {
        head.appendChild(s);
      } else {
        document.body.appendChild(s);
      }
    }


    return {
      importCSS: importCSS,
      importJS: importJS,
      writeStylesheet: writeStylesheet
    }
  }();

  var api = {};

  /**
   * Get details about the logged in user
   */
  api.currentUser = function () {
    var cu = require('CurrentUser');
    return  {
      /**
       * User id
       * @returns {string}
       */
      getID: cu.getID,
      /**
       * No idea
       * @returns {boolean}
       */
      isEmployee: cu.isEmployee,
      /**
       * No idea
       * @returns {boolean}
       */
      isGray: cu.isGray,
      /**
       * User logged in or not
       * @returns {boolean}
       */
      isLoggedIn: cu.isLoggedIn,
      /**
       * No idea
       * @returns {boolean}
       */
      isLoggedInNow: cu.isLoggedInNow
    }
  };

  /**
   * Notifications API
   */
  api.notifications = function () {
    var ns = require('NotificationStore');
    var unread = {
      /**
       * This is a async request. callback will be called with unread notifications.
       * @param callback function
       */
      list: ns.getAll,
      /**
       * Get unread notification count
       * @returns {int}
       */
      count: ns.getCount
    }, read = {};

    return{
      unread: unread,
      read: read
    }
  }

  /**
   * Chat Sidebar
   */
  api.sidebar = function () {
    var chat = require('Chat');
    return {
      /**
       * Close the side bar
       */
      closeBuddyList: chat.closeBuddyList,
      /**
       * Open the side bar
       */
      openBuddyList: chat.openBuddyList,
      /**
       * Toggle the side bar
       */
      toggleSidebar: chat.toggleSidebar
    };
  }
  return api;
}(this);