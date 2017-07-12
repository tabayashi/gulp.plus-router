'use strict';
var kindof = require('kind-of');

function Router(options) {
  if (!(this instanceof Router)) {
    return new Router(options);
  }

  if ('undefined' === kindof(options)) {
    options = {};
  }

  options.Routes  = options.Routes ||
                    require('./routes');
  options.Options = options.Options ||
                    require('./options');

  Object.defineProperties(this, {
    routes:  {value: new options.Routes(options)},
    options: {value: new options.Options(options)},
  });
}

Object.defineProperties(Router, {
  prototype: Object.defineProperties(Router.prototype, {
    constructor: {
      value: Router,
    },

    route: {
      value: function() {
        this.routes.register.apply(this.routes, arguments);
        return this;
      },
    },

    option: {
      value: function() {
        this.options.register.apply(this.options, arguments);
        return this;
      },
    },

    run: {
      value: function() {
        var options = this.options.results;
        var route   = this.routes.find(options);
        return route.controller.apply(
          null,
          [].slice.call(arguments).concat([options])
        );
      },
    },
  }),
});

module.exports = Router;
