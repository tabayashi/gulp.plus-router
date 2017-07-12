'use strict';

describe('Router', function() {
  var Router    = require('../../src/router');
  var construct = Router;
  var router, cb, r;

  describe('new Router(): Router', function() {
    it('should create Router object with new keyword', function() {
      router = new Router();
      expect(router).to.be.an.instanceof(Router);
    });

    it('should create Router object without new keyword', function() {
      expect(construct()).to.be.an.instanceof(Router);
    });
  });

  describe('.prototype', function() {
    beforeEach(function() {
      router = new Router();
    });

    describe('.route(conditions: Object, '
           + 'controller: (*) => *): Router', function() {
      it('should return router object', function() {
        var res = router.route(
          {m: 'development', c: ''},
          function() {
            return 'Site Development Mode';
          }
        );
        expect(res).to.be.equal(router);
      });

      it('should register route data to the routes registry', function() {
        router.route({m: 'development', c: ''}, function() {
          return 'Site Development Mode';
        });
        r = router.routes.registry[0];
        expect(r.controller()).to.be.equal('Site Development Mode');
        expect(r.conditions.m('development')).to.be.true;
      });
    });

    describe('.option(name: String, option: Object): Router', function() {
      it('should return router object', function() {
        var res = router
                    .option('m', {alias: 'mode', default: 'development'})
                    .option('c', {alias: 'component', default: ''});
        expect(res).to.be.equal(router);
      });

      it('should register option data to the options registry', function() {
        router.option('m', {alias: 'mode', default: 'development'})
              .option('c', {alias: 'component', default: ''});
        r = router.options.registry[0];
        expect(r.name).to.be.equal('m');
        expect(r.option.alias).to.be.equal('mode');
      });
    });

    describe('.run(): any', function() {
      it('should select proper controller to run router.', block(function() {
        this.stub(router.options, 'results').get(function() {
          return {
            m: 'production',
            mode: 'production',
            c: 'global',
            component: 'global',
          };
        });
        router
          .option('m', {alias: 'mode', default: 'development'})
          .option('c', {alias: 'component', default: ''})
          .route({m: 'development', c: ''}, function() {
            return 'Site Development Mode';
          })
          .route({m: 'production', c: ''}, function() {
            return 'Site Production Mode';
          })
          .route({m: 'development', c: '!'}, function() {
            return 'Component Development Mode';
          })
          .route({m: 'production', c: '!'}, function() {
            return 'Component Production Mode';
          });
        expect(router.run()).to.be.equal('Component Production Mode');
      }));
    });

    describe('.constructor', function() {
      it('should be a Router', function() {
        expect(router.constructor).to.be.equal(Router);
      });
    });

    describe('.options', function() {
      it('should be a Options', function() {
        router.option('m', {alias: 'mode', default: 'development'})
              .option('c', {alias: 'component', default: ''});
        expect(router.options.registry).to.be.lengthOf(2);
      });
    });

    describe('.routes', function() {
      it('should be a Routes', function() {
        router
          .route({m: 'development', c: ''}, function() {
            return 'Site Development Mode';
          })
          .route({m: 'production', c: ''}, function() {
            return 'Site Production Mode';
          });
        expect(router.routes.registry).to.be.lengthOf(2);
      });
    });
  });
});
