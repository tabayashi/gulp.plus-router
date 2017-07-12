'use strict';

describe('Factory', function() {
  var router = require('../src')();

  router
    .option('m', {type: 'string', alias: 'mode', default: 'development'})
    .option('c', {type: 'string', alias: 'component', default: ''})
    .route({m: 'development', c: ''}, function() {
      return 'Site Development Mode.';
    })
    .route({m: 'production', c: ''}, function() {
      return 'Site Production Mode.';
    })
    .route({m: 'development', c: 'global'}, function(argv) {
      return 'Component Development Mode. component: ' + argv.c;
    })
    .route({m: 'production', c: 'global'}, function(argv) {
      return 'Component Production Mode. component: ' + argv.c;
    });

  it('should select "Site Development Mode"',
    block(function() {
      this.stub(router.options, 'results').get(function() {
        return {
          m: 'development',
          mode: 'development',
          c: '',
          component: '',
        };
      });
      expect(router.run()).to.be.equal('Site Development Mode.');
    }));

  it('should select "Site Production Mode"',
    block(function() {
      this.stub(router.options, 'results').get(function() {
        return {
          m: 'production',
          mode: 'production',
          c: '',
          component: '',
        };
      });
      expect(router.run()).to.be.equal('Site Production Mode.');
    }));

  it('should select "Component Development Mode. component: global"',
    block(function() {
      this.stub(router.options, 'results').get(function() {
        return {
          m: 'development',
          mode: 'development',
          c: 'global',
          component: 'global',
        };
      });
      expect(router.run())
        .to.be.equal('Component Development Mode. component: global');
    }));

  it('should select "Component Production Mode. component: global"',
    block(function() {
      this.stub(router.options, 'results').get(function() {
        return {
          m: 'production',
          mode: 'production',
          c: 'global',
          component: 'global',
        };
      });
      expect(router.run())
        .to.be.equal('Component Production Mode. component: global');
    }));
});
