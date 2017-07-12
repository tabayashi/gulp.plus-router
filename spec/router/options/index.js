'use strict';

describe('Options', function() {
  var Options   = require('../../../src/router/options');
  var construct = Options;
  var options, r;

  describe('new Options(): Options', function() {
    it('should create instance with new keyword', function() {
      expect(new Options()).to.be.an.instanceof(Options);
    });

    it('should create instance by function call', function() {
      expect(construct()).to.be.an.instanceof(Options);
    });
  });

  describe('.prototype', function() {
    beforeEach(function() {
      options = new Options();
    });

    describe('.register(name: String, options: Object.): Options', function() {
      it('should return Options instance', function() {
        expect(options.register('m', {alias: 'mode'})).to.be.equal(options);
      });

      it('should register option data', function() {
        options.register('m', {alias: 'mode'});
        r = options.registry[0];
        expect(r).to.have.property('name', 'm');
        expect(r).to.have.nested.property('option');
      });

      it('should override if name is already registered', function() {
        options.register('m', {alias: 'mode'});
        options.register('m', {alias: 'many'});
        options.register('m', {alias: 'make'});
        expect(options.registry).to.be.lengthOf(1);
        expect(options.registry[options._index.m])
          .to.have.nested.property('option.alias', 'make');
      });
    });

    describe('.restore(): Options', function() {
      it('should return Options instance', function() {
        expect(options.restore()).to.be.equal(options);
      });

      it('should restore registry', function() {
        options.register('m', {alias: 'mode'});
        expect(options.registry).to.be.lengthOf(1);
        expect(options._index).to.have.property('m', 0);
        options.restore();
        expect(options.registry).to.be.empty;
        expect(options._index).to.be.empty;
      });
    });

    describe('.constructor', function() {
      it('should be an Options', function() {
        expect(options.constructor).to.be.equal(Options);
      });
    });

    describe('.registry', function() {
      it('should retain registered options', function() {
        options.register('m', {alias: 'mode'});
        options.register('c', {alias: 'component'});
        options.register('t', {alias: 'test'});
        options.register('c', {alias: 'command'});
        options.register('m', {alias: 'make'});
        expect(options.registry).to.have.lengthOf(3);
      });
    });

    describe('.results', function() {
      it('should be an results object '
      + 'that consist of command line options', block(function() {
        options.register('m', {alias: 'mode',      default: 'development'});
        options.register('c', {alias: 'component', default: ''});
        expect(options.registry).to.have.lengthOf(2);
        this.stub(options, 'results').get(function() {
          return {
            m: 'production',
            mode: 'production',
            c: 'global',
            component: 'global',
          };
        });
        r = options.results;
        expect(r).to.have.property('m',         'production');
        expect(r).to.have.property('mode',      'production');
        expect(r).to.have.property('c',         'global');
        expect(r).to.have.property('component', 'global');
      }));
    });
  });
});
