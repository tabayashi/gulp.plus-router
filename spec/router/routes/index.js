'use strict';

describe('Routes', function() {
  var Routes = require('../../../src/router/routes');
  var construct = Routes;
  var noop = new Function;
  var routes, r;

  describe('new Routes(): Routes', function() {
    it('should create instance with new keyword', function() {
      expect(new Routes()).to.be.an.instanceof(Routes);
    });

    it('should create instance by function call', function() {
      expect(construct()).to.be.an.instanceof(Routes);
    });
  });

  describe('.prototype', function() {
    beforeEach(function() {
      routes = new Routes();
    });

    describe('.register(conditions: Object, '
           + 'controller: (any) => any): Routes', function() {
      it('should return Routes instance', function() {
        var res = routes.register({m: 'development', c: ''}, noop);
        expect(res).to.be.equal(routes);
      });

      it('should register routes data', function() {
        routes.register({m: 'development', c: ''}, noop);
        r = routes.registry[0];
        expect(r).to.have.property('conditions')
                  .that.property('m').is.a('Function');
        expect(r).to.have.property('controller');
      });
    });

    describe('.restore(): Routes', function() {
      it('should return Routes instance', function() {
        expect(routes.restore()).to.be.equal(routes);
      });

      it('should restore registry', function() {
        routes.register({m: 'development', c: ''}, new Function);
        expect(routes.registry).to.be.lengthOf(1);
        routes.restore();
        expect(routes.registry).to.be.empty;
      });
    });

    describe('.find(options: Object): Route', function() {
      it('should return first matched one', function() {
        routes.register({m: 'development', c: '!'}, function() {
          return 'First Matched Route !';
        });
        routes.register({m: 'development', c: 'global'}, function() {
          return 'Second Matched Route !';
        });
        var route = routes.find({m: 'development', c: 'global'});
        expect(route.controller()).to.be.equal('First Matched Route !');
      });
    });

    describe('.constructor', function() {
      it('should be an Routes', function() {
        expect(routes.constructor).to.be.equal(Routes);
      });
    });

    describe('.registry', function() {
      it('should retain registered routes', function() {
        routes.register({m: 'development', c: ''}, new Function);
        routes.register({m: 'production', c: ''}, new Function);
        routes.register({m: 'development', c: '!'}, new Function);
        routes.register({m: 'production', c: '!'}, new Function);
        expect(routes.registry).to.have.lengthOf(4);
      });
    });
  });
});
