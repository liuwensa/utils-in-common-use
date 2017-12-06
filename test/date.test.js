'use strict';

const should = require('should');

const myutils = require('../utils');

const DateUtils = myutils.date;

describe('date api:', function () {
  describe('format()', function () {
    it(`format('yyyy-MM-dd', new Date('2017/12/06')) should return 2017-12-06`, function () {
      DateUtils.format('yyyy-MM-dd', new Date('2017/12/06')).should.equal('2017-12-06');
    });
  });

  describe('getStartTime()', function () {
    it(`getStartTime('2017/12/06') should return 1512489600000`, function () {
      DateUtils.getStartTime('2017/12/06').should.equal(1512489600000);
    });
  });

  describe('getEndTime()', function () {
    it(`getEndTime('2017/12/06') should return 1512576000000`, function () {
      DateUtils.getEndTime('2017/12/06').should.equal(1512576000000);
    });
  });
});