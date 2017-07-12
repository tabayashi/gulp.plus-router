'use strict';
var kindof = require('kind-of');
var yargs  = require('yargs');

function Options(options) {
  if (!(this instanceof Options)) {
    return new Options(options);
  }

  if ('undefined' === kindof(options)) {
    options = {};
  }

  options.Option = options.Option ||
                   require('./option');

  Object.defineProperties(this, {
    Option: {value: options.Option},
    registry: {value: []},
    _index: {value: {}, enumerable: true},
  });
}

Object.defineProperties(Options, {
  prototype: Object.defineProperties(Options.prototype, {
    constructor: {
      value: Options,
    },

    results: {
      get: function() {
        var args;
        yargs.reset();
        this.registry.forEach(function(option) {
          yargs.option(option.name, option.option);
        });
        args = yargs.argv;
        delete args['$0'];
        delete args['_'];
        return args;
      },
      configurable: !!process.env.GULP_PLUS_ROUTER_TEST,
    },

    register: {
      value: function(name, option) {
        var object = new this.Option(name, option);
        var index  = this._index[name];
        if ('undefined' === kindof(index)) {
          index = this.registry.length;
          this.registry.splice(index, 0, object);
          this._index[name] = index;
        } else {
          this.registry.splice(index, 1, object);
        }
        return this;
      },
    },

    restore: {
      value: function() {
        this.registry.splice(0, this.registry.length);
        Object.keys(this._index).forEach(function(name) {
          delete this._index[name];
        }, this);
        return this;
      },
    },
  }),
});

module.exports = Options;
