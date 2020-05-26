/**
 * @param value
 * @return {Boolean}
 * @description 判断是否为空
 * */
export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

/**
 * @param {String} time
 * @return {String}
 * @description 格式化时间
 * */
export const formatDate = time => formatDateTime(time, "{Y}-{M}-{D}");

/**
 * @param {String} time
 * @param {String=} cFormat
 * @return {String}
 * @description 格式化时间
 * */
export const formatDateTime = (time, cFormat) => {
  if (!time) return "";
  let date = new Date(time);
  const format = cFormat || "{Y}-{M}-{D} {h}:{m}:{s}";
  const formatObj = {
    Y: date.getFullYear(),
    M: (date.getMonth() + 1).toString().padStart(2, "0"),
    D: date
      .getDate()
      .toString()
      .padStart(2, "0"),
    h: date
      .getHours()
      .toString()
      .padStart(2, "0"),
    m: date
      .getMinutes()
      .toString()
      .padStart(2, "0"),
    s: date
      .getSeconds()
      .toString()
      .padStart(2, "0")
  };
  return format.replace(/{(Y|M|D|h|m|s)+}/g, (result, key) => {
    return formatObj[key];
  });
};

/**
 * @param {Object} target
 * @param {Object} object
 * @description target从object中取值 target <= object
 * */
export const objectEvaluate = (target, object) => {
  for (let key in target) {
    if (object.hasOwnProperty(key)) {
      if (object[key] instanceof Array) {
        target[key] = [...object[key]];
      } else {
        target[key] = object[key];
      }
    }
  }
};
