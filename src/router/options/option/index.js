'use strict';
var kindof = require('kind-of');
var allows = {
  alias:   true,
  type:    true,
  default: true,
  choice:  true,
};

function Option(name, option) {
  if (!(this instanceof Option)) {
    return new Option(name, option);
  }

  if ('string' !== kindof(name)) {
    throw new TypeError('Invalid argument type');
  }

  if ('object' !== kindof(option)) {
    throw new TypeError('Invalid argument type');
  }

  var names = Object.keys(option);
  option = names.reduce(function(results, name) {
    if (allows[name]) {
      results[name] = option[name];
    }
    return results;
  }, {});

  Object.defineProperties(this, {
    name: {value: name},
    option: {value: option},
  });
}

Object.defineProperties(Option, {
  prototype: Object.defineProperties(Option.prototype, {
    constructor: {
      value: Option,
    },
  }),
});

module.exports = Option;
