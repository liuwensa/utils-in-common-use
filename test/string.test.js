'use strict';

const should = require('should');
const assert = require('assert');

const myutils = require('../utils');

const StringUtils = myutils.string;

describe('string api:', function () {
  describe('digitUppercase()', function () {
    it(`digitUppercase(100) should return 壹佰元整`, function () {
      StringUtils.digitUppercase(100).should.equal('壹佰元整');
    });
    it(`digitUppercase(0.5) should return 伍角`, function () {
      StringUtils.digitUppercase(0.5).should.equal('伍角');
    });
  });

  describe('getRandomCode()', function () {
    it(`getRandomCode() should return a string`, function () {
      assert(StringUtils.getRandomCode())
    });
  });

  describe('htmlToText()', function () {
    it('htmlToText("<html>大家好，<br>dddd</html>") should return 大家好，dddd', function () {
      StringUtils.htmlToText('<html>大家好，<br>dddd</html>').should.equal('大家好，dddd');
    });
  });
});