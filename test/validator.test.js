'use strict';

const should = require('should');
const assert = require('assert');

const myutils = require('../utils');

const validator = myutils.validator;

describe('string api:', function () {
  describe('验证用户名，字母开头，由字母、数组、下划线组成（6-12位）', function () {
    it(`validator.isUserName('abcdee') should return true`, function () {
      assert(validator.isUserName('abcdee'))
    });
    it(`validator.isUserName(abc) should return false`, function () {
      assert(!validator.isUserName('abc'))
    });
    it(`validator.isUserName(123abv) should return false`, function () {
      assert(!validator.isUserName('123abv'))
    });
    it(`validator.isUserName(a123545897fdfdfdfdfdfdf) should return false`, function () {
      assert(!validator.isUserName('a123545897fdfdfdfdfdfdf'))
    });
  });

  describe('是否是汉字组成的名称', function () {
    it(`validator.isGBKName('abcdee') should return false`, function () {
      assert(!validator.isGBKName('abcdee'))
    });
    it(`validator.isGBKName(你好) should return true`, function () {
      assert(validator.isGBKName('你好'))
    });
  });

  describe('是否是密码（6-20）', function () {
    it(`validator.isPsd('abcd') should return false`, function () {
      assert(!validator.isPsd('abcd'))
    });
    it(`validator.isPsd(123456) should return true`, function () {
      assert(validator.isPsd('123456'))
    });
  });

  describe('是否是qq号（5-10）', function () {
    it(`validator.isQQ('1234') should return false`, function () {
      assert(!validator.isQQ('1234'))
    });
    it(`validator.isQQ(123456) should return true`, function () {
      assert(validator.isQQ('123456'))
    });
    it(`validator.isQQ(0123456) should return false`, function () {
      assert(!validator.isQQ('0123456'))
    });
  });

  describe('是否由英文组成', function () {
    it(`validator.isEn('1234') should return false`, function () {
      assert(!validator.isEn('1234'))
    });
    it(`validator.isEn(abc) should return true`, function () {
      assert(validator.isEn('abc'))
    });
    it(`validator.isEn(你好) should return false`, function () {
      assert(!validator.isEn('你好'))
    });
  });

  describe('是否为身份证号', function () {
    it(`validator.isIdCard('1234') should return false`, function () {
      assert(!validator.isIdCard('1234'))
    });
    it(`validator.isIdCard(371322199110280583) should return true`, function () {
      assert(validator.isIdCard('371322199110280583'))
    });
    it(`validator.isIdCard(你好) should return false`, function () {
      assert(!validator.isIdCard('你好'))
    });
    it('validator.isIdCard(abc224188203234033) should return false', function () {
      assert(!validator.isIdCard('abc224188203234033'))
    });
  });

  describe('是否为手机号', function () {
    it(`validator.isPhoneNum('1234') should return false`, function () {
      assert(!validator.isPhoneNum('1234'))
    });
    it(`validator.isPhoneNum(18710898698) should return true`, function () {
      assert(validator.isPhoneNum('18710898698'))
    });
    it(`validator.isPhoneNum(你好) should return false`, function () {
      assert(!validator.isPhoneNum('你好'))
    });
  });

  describe('是否为URL地址', function () {
    it(`validator.isUrl('1234') should return false`, function () {
      assert(!validator.isUrl('1234'))
    });
    it(`validator.isUrl(baidu.com) should return true`, function () {
      assert(validator.isUrl('baidu.com'))
    });
    it(`validator.isUrl(你好) should return false`, function () {
      assert(!validator.isUrl('你好'))
    });
  });
});