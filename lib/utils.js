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
