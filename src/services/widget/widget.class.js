/* eslint-disable no-unused-vars */
const initialWidgets = [
  {
    id: 1,
    color: 'Red',
    sprocketCount: 7,
    owner: 'John'
  },
  {
    id: 2,
    color: 'Taupe',
    sprocketCount: 1,
    owner: 'George'
  },
  {
    id: 3,
    color: 'SAMUELLL',
    sprocketCount: 8,
    owner: 'Ringo'
  },
  {
    id: 4,
    color: 'Blue',
    sprocketCount: 2,
    owner: 'Paul'
  }
];

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    return Promise.resolve(initialWidgets);
  }

  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
