
const ticker = () =>{
  var fb_ticker = require('TickerController');
  return {
    /**
     * Show Ticker
     */
    show : () =>{
      fb_ticker.show($('pagelet_ticker'));
    },
    /**
     * Hide Ticker
     */
    hide : () =>{
      fb_ticker.hide($('pagelet_ticker'));
    }
  }
}();

