'use strict';

/**
 * 对象属性拷贝
 * @param obj
 * @returns {{}}
 */
exports.copy = function (obj) {
  const o = {};
  Object.keys(obj).forEach(function (i) {
    o[i] = obj[i]
  });
  return o;
};

/**
 * 对象深度拷贝
 * @param sObj
 * @returns {{}}
 */
exports.clone = function (sObj) {
  const tObj = {};
  for (const i in sObj) {
    if (typeof sObj[i] !== "object") {
      tObj[i] = sObj[i];
    } else if (sObj[i].constructor == Array) {
      tObj[i] = Object.clone(sObj[i]);
    } else {
      tObj[i] = tObj[i] || {};
      exports.clone(tObj[i], sObj[i]);
    }
  }
  return tObj;
};

/**
 * 对象赋值
 * @param tObj
 * @param sObj
 */
exports.assign = function (tObj, sObj) {
  for (const i in sObj) {
    if (typeof sObj[i] !== "object") {
      tObj[i] = sObj[i];
    } else if (sObj[i].constructor == Array) {
      tObj[i] = exports.clone(sObj[i]);
    } else {
      tObj[i] = tObj[i] || {};
      exports.assign(tObj[i], sObj[i]);
    }
  }
};

/**
 * 对象属性选择器
 * @param attr
 * @param obj
 * @param options
 * @returns Object
 */
exports.attrSelector = function (attr, obj, options = {ignoreAttrNotExistsError: true}) {
  if (!attr) {
    return obj;
  }

  if (typeof attr === 'string') {
    attr = [attr];
  }

  if (Array.isArray(attr)) {
    const selected = {};
    for (const i in attr) {
      if (typeof attr[i] === 'string') {
        if (!obj[attr[i]] && !options.ignoreAttrNotExistsError) {
          throw new Error('attribute [' + attr[i] + '] does not exists in obj');
        } else {
          selected[attr[i]] = obj[attr[i]];
        }
      }
    }
    return selected;
  } else {
    throw new Error('attribute must be a String or Array{String}');
  }
};

/**
 * 对象属性选择器
 * @param attr
 * @param obj
 * @param options
 * @returns Object
 */
exports.attrFilter = function (attr, obj, options = {ignoreAttrNotExistsError: true}) {
  if (!attr) {
    return obj;
  }

  if (typeof attr === 'string') {
    attr = [attr];
  }

  if (Array.isArray(attr)) {
    for (const i in attr) {
      if (typeof attr[i] === 'string') {
        if (!obj[attr[i]] && !options.ignoreAttrNotExistsError) {
          throw new Error('attribute [' + attr[i] + '] does not exists in obj');
        } else {
          delete obj[attr[i]];
        }
      }
    }
  } else {
    throw new Error('attribute must be a String or Array{String}');
  }
};

/**
 * 判断obj是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
exports.isEmptyObject = function (obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }
  return !Object.keys(obj).length;
};

/**
 * 深拷贝，支持常见类型
 * @param {Object} values
 */
exports.deepClone = function (values) {
  let copy;

  if (null === values || typeof values !== 'object') {
    return values;
  }

  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) {
        copy[attr] = deepClone(values[attr]);
      }
    }
    return copy;
  }

  throw new Error('unsupported type');
};
