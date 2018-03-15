const assert = require('assert');
const app = require('../../src/app');

describe('\'widget\' service', () => {
  it('registered the service', () => {
    const service = app.service('widget');

    assert.ok(service, 'Registered the service');
  });
});
