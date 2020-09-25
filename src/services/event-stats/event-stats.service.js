// Initializes the `event-stats` service on path `/event-stats`
const { EventStats } = require('./event-stats.class');
const createModel = require('../../models/event-stats.model');
const hooks = require('./event-stats.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    id: 'username'
  };

  // Initialize our service with any options it requires
  app.use('/event-stats', new EventStats(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('event-stats');

  service.hooks(hooks);
};
