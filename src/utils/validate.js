/* 是否手机号码*/
export function validatePhone(rule, value, callback) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (value === "" || value === undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入正确的电话号码"));
    } else {
      callback();
    }
  }
}

/* 用户名 */
export function validateUsername(rule, value, callback) {
  const reg1 = /[\S]/;
  const reg2 = /^[a-zA-Z0-9_]*$/;
  const reg3 = /^[a-zA-Z0-9_]{2,16}$/;
  if (value === "" || value === undefined || value == null) {
    callback();
  } else {
    if (!reg1.test(value) && value !== "") {
      callback(new Error("不能包括空格"));
    } else if (!reg2.test(value) && value !== "") {
      callback(new Error("只允许字母数字下划线"));
    } else if (!reg3.test(value) && value !== "") {
      callback(new Error("长度为2-16个字符"));
    } else {
      callback();
    }
  }
}
