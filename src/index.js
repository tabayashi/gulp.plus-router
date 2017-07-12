'use strict';
var kindof = require('kind-of');
var should = require('./lib/validator');

function Factory(options) {
  if (!(this instanceof Factory)) {
    return new Factory(options);
  }

  if ('undefined' === kindof(options)) {
    options = {};
  }

  options.Router  = options.Router ||
                    require('./router');
  options.Router.should = should;

  return new options.Router(options);
}

Object.defineProperties(Factory, {
  should: {value: should},
  prototype: Object.defineProperties(Factory.prototype, {
    constructor: {value: Factory},
  }),
});

module.exports = Factory;
