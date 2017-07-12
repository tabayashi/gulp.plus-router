'use strict';

describe('Route', function() {
  var Route = require('../../../../src/router/routes/route');
  var construct = Route;
  var noop = new Function;
  var route, cb;

  describe('new Route(conditions: Object, '
         + 'controller: (any) => any): Route', function() {
    it('should create instance with new keyword', function() {
      route = new Route({m: 'development', c: ''}, noop);
      expect(route).to.be.an.instanceof(Route);
    });

    it('should create instance by function call', function() {
      route = construct({m: 'development', c: ''}, noop);
      expect(route).to.be.an.instanceof(Route);
    });

    it('should throw exception '
     + 'unless given conditions is an Object', function() {
      cb = function() {
        return construct();
      };
      expect(cb).to.throw('Invalid argument type');
    });

    it('should throw exception '
     + 'unless given controller is an Function', function() {
      cb = function() {
        return construct({});
      };
      expect(cb).to.throw('Invalid argument type');
    });
  });

  describe('.prototype', function() {
    beforeEach(function() {
      route = new Route({m: 'development', c: ''}, noop);
    });

    describe('.match(options: Object): boolean', function() {
      it('should throw exception '
       + 'unless given options is an Object', function() {
        cb = function() {
          return route.match();
        };
        expect(cb).to.throw('Invalid argument type');
      });

      it('should return true if route is proper one', function() {
        expect(route.match({m: 'development', c: ''})).to.be.true;
        expect(route.match({m: 'production', c: 'global'})).to.be.false;
        expect(route.match({m: 'production', c: 'global'})).to.be.false;

        route = construct({
          m: ['development', 'production'],
          c: /^g/,
        }, noop);
        expect(route.match({m: 'development', c: 'global'})).to.be.true;
        expect(route.match({m: 'production', c: 'global'})).to.be.true;
        expect(route.match({m: 'development', c: 'gamba'})).to.be.true;
        expect(route.match({m: 'productive', c: 'gamba'})).to.be.false;
        expect(route.match({m: 'development', c: ''})).to.be.false;
        expect(route.match({m: 'productive', c: 'sports'})).to.be.false;
        route = new Route({
          m: '!development',
          c: 'global',
        }, new Function);
        expect(route.match({m: 'development', c: 'global'})).to.be.false;
        expect(route.match({m: 'developper', c: 'global'})).to.be.true;
        expect(route.match({m: 'developper', c: ''})).to.be.false;
        expect(route.match({m: 'production', c: 'global'})).to.be.true;
      });
    });

    describe('.constructor', function() {
      it('should be an Route', function() {
        expect(route.constructor).to.be.equal(Route);
      });
    });

    describe('.conditions', function() {
      it('should be an Object', function() {
        expect(route.conditions).to.be.an.instanceof(Object);
        expect(route.conditions)
          .to.have.property('m').that.is.an.instanceof(Function);
        expect(route.conditions.m('development')).to.be.true;
        expect(route.conditions.m('production')).to.be.false;
        expect(route.conditions.c('')).to.be.true;
        expect(route.conditions.c('global')).to.be.false;
      });
    });

    describe('.controller', function() {
      it('should be a Function', function() {
        expect(route.controller).to.be.an.instanceof(Function);
      });
    });
  });
});
