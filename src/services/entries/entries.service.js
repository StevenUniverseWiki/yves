// Initializes the `entries` service on path `/api/v1/entries`
const { Entries } = require('./entries.class');
const createModel = require('../../models/entries.model');
const hooks = require('./entries.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/api/entries', new Entries(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/entries');

  service.hooks(hooks);
};
