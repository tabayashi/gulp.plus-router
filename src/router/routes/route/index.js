'use strict';
var kindof = require('kind-of');
var should = require('../../../lib/validator');

function Route(conditions, controller) {
  if (!(this instanceof Route)) {
    return new Route(conditions, controller);
  }

  if ('object' !== kindof(conditions)) {
    throw new TypeError('Invalid argument type');
  }

  if ('function' !== kindof(controller)) {
    throw new TypeError('Invalid argument type');
  }

  var names  = Object.keys(conditions);
  conditions = names.reduce(function(results, name) {
    var condition = conditions[name];
    var predicate = validator(condition);

    if ('function' !== kindof(predicate)) {
      throw new TypeError('Invalid argument type');
    }

    results[name] = predicate;
    return results;
  }, {});

  Object.defineProperties(this, {
    conditions: {value: conditions},
    controller: {value: controller},
  });
}

Object.defineProperties(Route, {
  prototype: Object.defineProperties(Route.prototype, {
    constructor: {
      value: Route,
    },
    match: {
      value: function(options) {
        if (kindof(options) !== 'object') {
          throw new TypeError('Invalid argument type');
        }
        var names  = Object.keys(this.conditions);
        var result = names.find(function(name) {
          var subject  = options[name];
          var validate = this.conditions[name];
          return !validate(subject);
        }, this);
        return 'undefined' === kindof(result);
      },
    },
  }),
});

function validator(value) {
  switch (kindof(value)) {
    case 'function': {
      return value;
    }
    case 'array': {
      return should.beAPartOfThe(value);
    }
    case 'regexp': {
      return should.match(value);
    }
    case 'object': {
      return validator(value.toString());
    }
    case 'string': {
      if (/^!/.test(value)) {
        return should.notBeEqualsTo(value.substr(1));
      }
      // fallthrough
    }
  }
  return should.beEqualsTo(value);
}

module.exports = Route;
