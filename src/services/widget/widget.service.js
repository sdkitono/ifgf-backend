// Initializes the `widget` service on path `/widget`
const createService = require('./widget.class.js');
const hooks = require('./widget.hooks');
const filters = require('./widget.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'widget',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/widget', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('widget');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
