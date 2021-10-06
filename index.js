const { Plugin } = require('powercord/entities');

module.exports = class NotRealScience extends Plugin {
  startPlugin () {
    require('electron').webFrame.executeJavaScript(`
      xmlhttp = window.XMLHttpRequest.prototype.open;
      (function (open) {
        window.XMLHttpRequest.prototype.open = function (a, url, b, c, d) {
          if (url.toString().includes('/science' || '/track')) {
            return open.apply(this, null);
          }
          return open.apply(this, arguments);
        };
      }(XMLHttpRequest.prototype.open))`
    );
  }

  pluginWillUnload () {
    require('electron').webFrame.executeJavaScript(`
      window.XMLHttpRequest.prototype.open = xmlhttp;
      delete xmlhttp;
  `);
  }
};
