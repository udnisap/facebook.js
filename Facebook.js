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
  }();

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
  }();

  /**
   * Chat Sidebar
   */
  api.chat = function () {
    var chatSideBar = require('Chat'),
      chatOpenTab = require('ChatOpenTab'),
      available = require('AvailableList');
    return {
      /**
       * Close the side bar
       */
      closeChatList: chatSideBar.closeBuddyList,
      /**
       * Open the side bar
       */
      openChatList: chatSideBar.openBuddyList,
      /**
       * Toggle the side bar
       */
      toggleSidebar: chatSideBar.toggleSidebar,
      /**
       * Opens the chat window
       * @param userId
       */
      openChatWindow: function (userId) {
        chatOpenTab.openUserTab(userId, "ordered_list", {global_slot: 5});
      },
      /**
       * Get Online Friend List
       * @returns {array}
       */
      getOnlineFriends : available.getOnlineIDs,

    };
  }();

  api.title = function () {
    var dt = require('DocumentTitle');
    return {
      /**
       * Get the title
       * @returns {string}
       */
      get: dt.get,
      /**
       * Sets the title
       * @params title
       */
      set: dt.set,
      /**
       * Blinks the title
       * @params title
       * @returns {object} run stop to stop blink
       */
      blink: dt.blink
    }
  }();


  return api;
}(this);