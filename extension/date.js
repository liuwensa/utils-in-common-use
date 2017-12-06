'use strict';

const oneDay = 24 * 60 * 60 * 1000;

module.exports = {
  format,
  getStartTime,
  getEndTime
};

/**
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * @param fmt
 * @param date
 * @returns {*}
 * @constructor
 */
function format(fmt, date) {
  const self = date ? new Date(date) : new Date();
  const o    = {
    "M+": self.getMonth() + 1,                  	//月
    "d+": self.getDate(),                    			//日
    "h+": self.getHours(),                   			//时
    "m+": self.getMinutes(),                 			//分
    "s+": self.getSeconds(),                 			//秒
    "q+": Math.floor((self.getMonth() + 3) / 3), 	//季度
    "S" : self.getMilliseconds()             			//毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (self.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }

  return fmt;
}

/**
 * 获取某一天的开始时间
 * @param date
 * @returns {number}
 */
function getStartTime(date = new Date()) {
  const timeDay = format('yyyy-MM-dd', new Date(date));

  return new Date(`${timeDay} 00:00`).getTime();
}

/**
 * 获取某一天的结束时间
 * @param date
 * @returns {number}
 */
function getEndTime(date = new Date()) {
  const startTime = getStartTime(date);

  return startTime + oneDay;
}
