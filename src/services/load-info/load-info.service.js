// Initializes the `loadInfo` service on path `/loadInfo`
const createService = require('./load-info.class.js');
const hooks = require('./load-info.hooks');
const filters = require('./load-info.filters');

module.exports = function () {
  const app = this;
  // const paginate = app.get('paginate');

  const options = {
    name: 'load-info'
  };

  // Initialize our service with any options it requires
  app.use('/loadInfo', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('loadInfo');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
