const { authenticate } = require('@feathersjs/authentication').hooks;

const getEntry = require('../../hooks/get-entry');

exports.searchRegex = function () {
  return function (hook) {
    const query = hook.params.query;
    const searchableFields = ['text', 'banReason', 'user', 'targetUser'];
    for (let field in query) {
      if (searchableFields.includes(field) && query[field].$search && field.indexOf('$') == -1) {
        query[field] = { $regex: new RegExp(query[field].$search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), query[field].$searchCaseSensitive ? '': 'i') }
      }
    }
    hook.params.query = query
    return hook
  }
}

module.exports = {
  before: {
    all: [],
    find: [this.searchRegex()],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [getEntry()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
