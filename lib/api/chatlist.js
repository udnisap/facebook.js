
/**
 * Chat Sidebar
 */
const chat = () => {
  var fb_avaliableList = require('AvailableList'),
    fb_openChat = require('ChatOpenTab'),
    fb_messageTypes = require('MercurySourceType'),
    fb_messages = require('MercuryMessages').get(),
    fb_chat = require('Chat'),
  return {
    /**
     * Close the side bar
     */
    closeChatList: fb_chat.closeBuddyList,
    /**
     * Open the side bar
     */
    openChatList: fb_chat.openBuddyList,
    /**
     * Toggle the side bar
     */
    toggleSidebar: fb_chat.toggleSidebar,
    /**
     * Opens the chat window
     * @param userId
     */
    openChatWindow: (userId) => {
      fb_openChat.openUserTab(userId, "ordered_list", {global_slot: 5});
    },
    /**
     * Get Online Friend List
     * @returns {array}
     */
    getOnlineFriends: fb_avaliableList.getOnlineIDs,
    /**
     * Send a web chat to a friend
     * @param userid
     * @param msg
     * @param source @getMessageTypes for types
     */
    sendWebChat: (userid, msg, source) => {
      source = source in fb_messageTypes ? source : fb_messageTypes.CHAT_WEB;
      var fbwebchat = fb_messages.constructUserGeneratedMessageObject(msg, source, "user:" + userid);
      fb_messages.sendMessage(fbwebchat);
    },
    /**
     * Types of messages that can be sent
     */
    getMessageTypes: fb_messageTypes,
    /**
     * Get Last message from a user
     * @param userid
     * @param offset
     * @param limit
     * @param callback with array of messages
     */
    getMessages : (userid,offset, limit, callback) =>{
      offset = offset ? offset : 0;
      limit = limit ? limit : 10;
      fb_messages.getThreadMessagesRange("user:"+userid, offset, limit, (messages) =>{
        var refined = _.map(messages, (msg) =>{
          var r = _.pick(msg, "body", "author", "timestamp");
          r.raw = msg;
          return r;
        })
        callback(refined);
      });
    }
  };
}();

