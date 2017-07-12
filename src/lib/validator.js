'use strict';
var kindof = require('kind-of');
var should = Object.defineProperties({}, {
  /**
   * 厳密等価演算において等価性を検証するコールバックを生成する
   * @param {*} predicate - 妥当値
   * @return {should~validator} - バリデータ
   */
  beEqualsTo: {
    value: function(predicate) {
      if (!arguments.length) {
        throw new TypeError('Invalid argument type');
      }
      return function(subject) {
        if (!arguments.length) {
          throw new TypeError('Invalid argument type');
        }
        return subject === predicate;
      };
    },
  },

  /**
   * 厳密等価演算において不等価性を検証するコールバックを生成する
   * @param {*} predicate - 妥当値
   * @return {should~validator} - バリデータ
   */
  notBeEqualsTo: {
    value: function(predicate) {
      if (!arguments.length) {
        throw new TypeError('Invalid argument type');
      }
      return function(subject) {
        if (!arguments.length) {
          throw new TypeError('Invalid argument type');
        }
        return subject !== predicate;
      };
    },
  },

  /**
   * 正規表現において等価性を検証するコールバックを生成する
   * @param {RegExp} predicate - 正規表現オブジェクト
   * @return {should~validator} - バリデータ
   * @throws {TypeError}
   */
  match: {
    value: function(predicate) {
      if (kindof(predicate) !== 'regexp') {
        throw new TypeError('Invalid argument type');
      }
      return function(subject) {
        if (!arguments.length) {
          throw new TypeError('Invalid argument type');
        }
        return predicate.test(subject);
      };
    },
  },

  /**
   * 厳密等価演算において、妥当値候補の配列に
   * 検証値と等価の値が含まれるかを検証するコールバックを生成する
   * @param {should~validator[]} predicates - 妥当値候補の配列
   * @return {should~validator} - バリデータ
   * @throws {TypeError}
   */
  beAPartOfThe: {
    value: function(predicates) {
      if (kindof(predicates) !== 'array') {
        throw new TypeError('Invalid argument type');
      }
      return function(subject) {
        return !!predicates.find(function(predicate) {
          return subject === predicate;
        });
      };
    },
  },
});

/** alias */
should.eq      = should.beEqualsTo;
should.ne      = should.notBeEqualsTo;
should.partof  = should.beAPartOfThe;

module.exports = should;
/**
 * 妥当性を検証するためのコールバック
 * @callback should~validator
 * @param {*} subject - 妥当性検証値
 * @return {boolean} - 妥当な場合はtrueを返す
 */
