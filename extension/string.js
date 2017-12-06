'use strict';

const cheerio = require('cheerio');

module.exports = {
  digitUppercase,
  getRandomCode,
  htmlToText
};

/**
 * 现金额转大写
 * @param  {Number} money
 * @return {String}
 */
function digitUppercase(money) {
  const fraction = ['角', '分'];
  const digit    = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  const unit     = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  let head       = money < 0 ? '欠' : '';
  money          = Math.abs(money);
  let s          = '';

  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(money * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s     = s || '整';
  money = Math.floor(money);
  for (let i = 0; i < unit[0].length && money > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && money > 0; j++) {
      p     = digit[money % 10] + unit[1][j] + p;
      money = Math.floor(money / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

/**
 * 随机返回一个在min-max范围内的整数
 * @param {*} min
 * @param {*} max
 */
function getRandomNum(min, max) {
  return (Math.floor(Math.random() * (max - min)) + min);
}

/**
 * 随机返回以为字符
 * @param {Number} isNumber
 * @param {Number} isLower
 * @param {Number} isUpper
 * @param {Number} isOther
 * @returns {string}
 */
function getRandomChar(isNumber, isLower, isUpper, isOther) {
  const numberChars = '0123456789';
  const lowerChars  = 'abcdefghijklmnopqrstuvwxyz';
  const upperChars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const otherChars  = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ";
  let charSet       = '';

  if (isNumber) {
    charSet += numberChars;
  }

  if (isLower) {
    charSet += lowerChars;
  }

  if (isUpper) {
    charSet += upperChars;
  }

  if (isOther) {
    charSet += otherChars;
  }

  const idx = getRandomNum(0, charSet.length);

  return charSet.charAt(idx);
}

/**
 * 获取随机生成码
 * @param {Number} length
 * @param {Number} isNumber
 * @param {Number} isLower
 * @param {Number} isUpper
 * @param {Number} isOther
 * @returns {string}
 */
function getRandomCode(length = 6, isNumber = 1, isLower = 1, isUpper = 1, isOther = 1) {
  let rc = '';
  for (let i = 0; i < length; i++) {
    rc += getRandomChar(isNumber, isLower, isUpper, isOther);
  }
  return rc;
}

/**
 * 提取html中的文字
 * @param {String} content
 * @returns {*}
 */
function htmlToText(content) {
  if (!content) {
    return '';
  }

  return cheerio.load(content).text();
}
