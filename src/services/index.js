const user = require('./user/user.service.js');
const loadInfo = require('./load-info/load-info.service.js');
const widget = require('./widget/widget.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(user);
  app.configure(loadInfo);
  app.configure(widget);
};
