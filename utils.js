'use strict';

const os     = require('os');
const uuid   = require('node-uuid');
const lodash = require('lodash');
const md5    = require('md5');

const Utils = module.exports = {
  uuid  : uuid,
  _     : lodash,
  lodash: lodash,

  myuuid: function () {
    return uuid().replace(/-/g, '');
  },

  getIpv4: function () {
    const interfaces = os.networkInterfaces();
    for (const devName in interfaces) {
      if (interfaces.hasOwnProperty(devName)) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
          const alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            return alias.address;
          }
        }
      }
    }
  },

  getReqIP: function (req) {
    const ip = req.headers['x-forwarded-for']
      || req.connection.remoteAddress
      || req.ip
      || req._remoteAddress
      || (req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress)))
      || '';

    const ips = ip.match(/:?((\d{1,3}\.?){4})/);

    return ips && ips[1] ? ips[1] : '';
  },

  md5: function (content) {
    return md5(content);
  },

  /**
   * 随机数组arr中的n项
   * @param {Array} arr
   * @param {Number} n
   * @returns {Array}
   */
  randomArray: function (arr, n) {
    let a = [];

    if (arr && arr.length) {
      if (arr.length > n) {
        for (let i = 0; i < n; i++) {
          const idx = Math.floor((Math.random() * arr.length));
          const str = arr.splice(idx, 1)[0];
          a.push(str);
        }
      } else {
        a = arr;
      }
    }

    return a;
  },

  /**
   * 往数组arr中插入sources中不重复的n项
   * @param arr
   * @param sources
   * @param n
   */
  uniqPush: function (arr, sources, n) {
    const len = sources.length;
    let j     = 0;
    for (let i = 0; i < len; i++) {
      if (sources[i] && !arr.includes(sources[i])) {
        arr.push(sources[i]);
        j++;
      }
      if (j >= n) {
        break;
      }
    }
  },

  /**
   * 根据父子生成数组树结构
   * @param {Array} data
   * @param {String} id
   * @param {String} pid
   * @param {String} children
   * @returns {Array}
   */
  transData: function (data, id = 'id', pid = 'parentID', children = 'children') {
    const resluts = [];
    const hash    = {};

    for (let i = 0, len = data.length; i < len; i++) {
      hash[data[i][id]] = data[i];
    }


    for (let i = 0, len = data.length; i < len; i++) {
      const aVal   = data[i];
      const hashVP = hash[aVal[pid]];
      if (hashVP) {
        !hashVP[children] && (hashVP[children] = []);
        hashVP[children].push(aVal);
      } else {
        resluts.push(aVal);
      }
    }

    return resluts;
  },

  /**
   * 随机生成红包的数额（整数）
   * @param {Number} remainSize
   * @param {Number} remainMoney
   * @returns {Array}
   */
  getRandomMoney: function (remainSize, remainMoney) {
    const moneys = [];

    for (; remainSize > 0; remainSize--) {
      if (remainSize === 1) {
        moneys.push(remainMoney);
      } else {
        const min = 1;
        const max = Math.round(remainMoney / remainSize * 2);

        let money = Math.random() * max;

        money = money <= min ? 1 : money;
        money = Math.floor(money);

        moneys.push(money);

        remainMoney -= money;
      }
    }

    return moneys;
  },

  /**
   * 版本号对比
   * @param newVersion
   * @param oldVersion
   * @returns {boolean}
   */
  checkVersion: function (newVersion, oldVersion) {
    if (!oldVersion || typeof oldVersion !== 'string') {
      return true;
    }

    if (!newVersion || typeof newVersion !== 'string') {
      return false;
    }

    const newVersions = newVersion.split('.');
    const oldVersions = oldVersion.split('.');

    if (oldVersions.length < newVersions.length) {
      let len = newVersions.length - oldVersions.length;
      for (let i = 0; i < len; i++) {
        oldVersions.push(0);
      }
    }

    let flag  = true;
    let eqNum = 0;

    for (let i = 0; i < oldVersions.length; i++) {
      let newNum = +newVersions[i] || 0;
      let oldNum = +oldVersions[i] || 0;
      let diff   = newNum - oldNum;
      if (diff < 0) {
        flag = false;
        break;
      } else if (diff > 0) {
        flag = true;
        break;
      } else {
        eqNum++;
      }
    }
    return eqNum === oldVersions.length ? false : flag;
  },

  bitCount: function (flag) {
    let n = 0;

    for (; flag; ++n) {
      flag &= (flag - 1);
    }
    return n;
  },

  dealKeyWord: function (keyword) {
    if (!keyword) {
      return keyword;
    }

    keyword = keyword.trim();

    keyword = keyword
      .replace(/'/g, '\\\'')
      .replace(/"/g, '\\"')
      .replace(/%/g, '\\%')
      .replace(/_/g, '\\_');

    const regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;

    if (keyword.match(regRule)) {
      keyword = keyword.replace(regRule, '');
    }

    return keyword;
  }
};

lodash.extend(Utils, require('./extension'));
