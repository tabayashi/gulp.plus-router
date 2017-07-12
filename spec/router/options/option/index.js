'use strict';

describe('Option', function() {
  var Option = require('../../../../src/router/options/option');
  var construct = Option;
  var option;

  beforeEach(function() {
    option = new Option('m', {default: 'dev', alias: 'mode'});
  });

  describe('new Option(name: string, options: Object.): Option', function() {
    it('should throw exception unless given name is a String', function() {
      expect(function() {
        return new Option();
      }).to.throw('Invalid argument type');
    });

    it('should throw exception unless given options is an Object', function() {
      expect(function() {
        return new Option('m');
      }).to.throw('Invalid argument type');
    });

    it('should create instance with new keyword', function() {
      expect(new Option('m', {
        default: 'dev', alias: 'mode',
      })).to.be.an.instanceof(Option);
    });

    it('should create instance by function call', function() {
      expect(construct('m', {
        default: 'dev', alias: 'mode',
      })).to.be.an.instanceof(Option);
    });
  });

  describe('.prototype', function() {
    describe('.constructor', function() {
      it('should be an Option', function() {
        expect(option.constructor).to.be.equal(Option);
      });
    });

    describe('.name', function() {
      it('should be a String', function() {
        expect(option).to.have.property('name').that.equal('m');
      });
    });

    describe('.option', function() {
      it('should be an Object', function() {
        expect(option).to.have.property('name').that.equal('m');
        expect(option.option).to.have.property('default', 'dev');
        expect(option.option).to.have.property('alias',  'mode');
      });
    });
  });
});
