  /**
   * Get details about the logged in user
   */
const currentUser = () => {
  var fb_currentUser = require('CurrentUser');
  return  {
    /**
     * User id
     * @returns {string}
     */
    getID: fb_currentUser.getID,
    /**
     * No idea
     * @returns {boolean}
     */
    isEmployee: fb_currentUser.isEmployee,
    /**
     * No idea
     * @returns {boolean}
     */
    isGray: fb_currentUser.isGray,
    /**
     * User logged in or not
     * @returns {boolean}
     */
    isLoggedIn: fb_currentUser.isLoggedIn,
    /**
     * No idea
     * @returns {boolean}
     */
    isLoggedInNow: fb_currentUser.isLoggedInNow
  }
}();
export default currentUser;
