'use strict';
var kindof = require('kind-of');

function Routes(options) {
  if (!(this instanceof Routes)) {
    return new Routes(options);
  }

  if ('undefined' === kindof(options)) {
    options = {};
  }

  options.Route = options.Route ||
                  require('./route');

  Object.defineProperties(this, {
    Route: {value: options.Route},
    registry: {value: []},
  });
}

Object.defineProperties(Routes, {
  prototype: Object.defineProperties(Routes.prototype, {
    constructor: {
      value: Routes,
    },

    register: {
      value: function(conditions, controller) {
        this.registry.push(new this.Route(conditions, controller));
        return this;
      },
    },

    restore: {
      value: function() {
        this.registry.splice(0, this.registry.length);
        return this;
      },
    },

    find: {
      value: function(options) {
        var route = this.registry.find(function(route) {
          return route.match(options);
        });
        if ('undefined' === kindof(route)) {
          throw new Error('Route not found.');
        }
        return route;
      },
    },
  }),
});

module.exports = Routes;
