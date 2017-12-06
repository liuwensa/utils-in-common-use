'use strict';

const should = require('should');
const assert = require('assert');

const myutils = require('../utils');

describe('myutils api:', function () {
  describe('getIpv4()', function () {
    it(`getIpv4 should return ip`, function () {
      assert(myutils.getIpv4());
    });
  });
});