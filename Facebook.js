var FB = FB || function () {
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

  api.ticker = function(){
    var tickerControler = require('TickerController');
    return {
      /**
       * Show Ticker
       */
      show : function(){
        tickerControler.show($('pagelet_ticker'));
      },
      /**
       * Hide Ticker
       */
      hide : function(){
        tickerControler.hide($('pagelet_ticker'));
      }
    }
  }();

  /**
   * Chat Sidebar
   */
  api.chat = function () {
    var chatSideBar = require('Chat'),
      chatOpenTab = require('ChatOpenTab'),
      available = require('AvailableList'),
      messages = require('MercuryMessages').get(),
      messageTypes = require('MercurySourceType');
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
      getOnlineFriends: available.getOnlineIDs,
      /**
       * Send a web chat to a friend
       * @param userid
       * @param msg
       * @param source @getMessageTypes for types
       */
      sendWebChat: function (userid, msg, source) {
        source = source in messageTypes ? source : messageTypes.CHAT_WEB;
        var fbwebchat = messages.constructUserGeneratedMessageObject(msg, source, "user:" + userid);
        messages.sendMessage(fbwebchat);
      },
      /**
       * Types of messages that can be sent
       */
      getMessageTypes: messageTypes,
      /**
       * Get Last message from a user
       * @param userid
       * @param offset
       * @param limit
       * @param callback with array of messages
       */
      getMessages : function(userid,offset, limit, callback){
        offset = offset ? offset : 0;
        limit = limit ? limit : 10;
        messages.getThreadMessagesRange("user:"+userid, offset, limit, function(messages){
          var refined = _.map(messages, function(msg){
            var r = _.pick(msg, "body", "author", "timestamp");
            r.raw = msg;
            return r;
          })
          callback(refined);
        });
      }
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
