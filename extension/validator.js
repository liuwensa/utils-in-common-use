'use strict';

const validator  = require('validator');

// /^\d+$/　　//非负整数（正整数 + 0） 
// /^[0-9]*[1-9][0-9]*$/　　//正整数 
// /^((-\d+)|(0+))$/　　//非正整数（负整数 + 0） 
// /^-[0-9]*[1-9][0-9]*$/　　//负整数 
// /^-?\d+$/　　　　//整数 
// /^\d+(\.\d+)?$/　　//非负浮点数（正浮点数 + 0） 
// /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/　　//正浮点数 
// /^((-\d+(\.\d+)?)|(0+(\.0+)?))$/　　//非正浮点数（负浮点数 + 0） 
// /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/　　//负浮点数 
// /^(-?\d+)(\.\d+)?$/　　//浮点数 

/**
 * 是否是用户名，字母开头，由字母、数组、下划线组成
 * @param {String} str
 * @returns {boolean}
 */
validator.isUserName = function (str) {
  return /^[a-zA-Z][a-zA-Z0-9_]{5,11}$/.test(str);
};

/**
 * 是否是汉字组成的名称
 * @param {String} str
 * @returns {boolean}
 */
validator.isGBKName = function (str) {
  return /[\u4e00-\u9fa5]/.test(str);
};

/**
 * 是否是密码
 * @param {String} str
 * @returns {boolean}
 */
validator.isPsd = function (str) {
  return /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/.test(str);
};

/**
 * 是否是qq号
 * @param {String} str
 * @returns {boolean}
 */
validator.isQQ = function (str) {
  return /^[1-9][0-9]{4,9}$/.test(str);
};

/**
 * 是否由英文组成
 * @param {String} str
 * @returns {boolean}
 */
validator.isEn = function (str) {
  return /^\S+[a-z A-Z]$/.test(str);
};

/**
 * 判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
validator.isIdCard = function (str) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
};

/**
 * 判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
validator.isPhoneNum = function (str) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
};

/**
 * 判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
validator.isUrl = function (str) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
};

module.exports = validator;
