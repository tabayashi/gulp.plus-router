'use strict';
var should = require('../../src/lib/validator');
var cb;

describe('should', function() {
  describe('beEqualsTo(predicate: any): (subject: *) => boolean', function() {
    it('should throw exception unless arguments', function() {
      cb = function() {
        return should.beEqualsTo();
      };
      expect(cb).to.throw('Invalid argument type');
    });

    it('should return callback', function() {
      expect(should.beEqualsTo(1)).to.be.an.instanceof(Function);
    });

    describe('(subject: *) => boolean', function() {
      it('subject should be equals to predicate', function() {
        cb = should.beEqualsTo(1);
        expect(cb(1)).to.be.true;
      });
    });
  });

  describe('notBeEqualsTo(predicate: any): (subject: *) => boolean', function() {
    it('should throw exception unless arguments', function() {
      cb = function() {
        return should.notBeEqualsTo();
      };
      expect(cb).to.throw('Invalid argument type');
    });

    it('should return callback', function() {
      expect(should.notBeEqualsTo(1)).to.be.an.instanceof(Function);
    });

    describe('(subject: *) => boolean', function() {
      it('subject should not be equals to predicate', function() {
        cb = should.notBeEqualsTo(1);
        expect(cb(2)).to.be.true;
      });
    });
  });

  describe('match(predicate: RegExp): (subject: *) => boolean', function() {
    it('should throw exception unless given predicate is a RegExp', function() {
      cb = function() {
        return should.match();
      };
      expect(cb).to.throw('Invalid argument type');
    });

    it('should return callback', function() {
      expect(should.match(/^g/)).to.be.an.instanceof(Function);
    });

    describe('(subject: *) => boolean', function() {
      it('subject should match predicate', function() {
        cb = should.match(/^g/);
        expect(cb('global')).to.be.true;
      });
    });
  });

  describe('beAPartOfThe(predicate: any[]): (subject: *) => boolean', function() {
    it('should throw exception unless given predicate is an Array', function() {
      cb = function() {
        return should.beAPartOfThe();
      };
      expect(cb).to.throw('Invalid argument type');
    });

    it('should return callback', function() {
      expect(should.beAPartOfThe([])).to.be.an.instanceof(Function);
    });

    describe('(subject: *) => boolean', function() {
      it('subject should be a part of the predicate', function() {
        cb = should.beAPartOfThe([1, 2, 3]);
        expect(cb(2)).to.be.true;
      });
    });
  });
});
