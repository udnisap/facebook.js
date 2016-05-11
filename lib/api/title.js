const title = () => {
  var fb_title = require('DocumentTitle'),
  return {
    /**
     * Get the title
     * @returns {string}
     */
    get: fb_title.get,
    /**
     * Sets the title
     * @params title
     */
    set: fb_title.set,
    /**
     * Blinks the title
     * @params title
     * @returns {object} run stop to stop blink
     */
    blink: fb_title.blink
  }
}();

