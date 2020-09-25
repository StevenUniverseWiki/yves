const users = require('./users/users.service.js');
const entries = require('./entries/entries.service.js');
const eventStats = require('./event-stats/event-stats.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(entries);
  app.configure(eventStats);
};
