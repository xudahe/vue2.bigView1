/*
 * @Description: 正则判断表达式
 */

export const verif = {};
var regular = /[0-9]+([.]{1}[0-9]+){0,1}/ //输入整数或小数
var reg0 = /^\S{6,}$/; // 不少于6位字符（任何字符）
var reg1 = /([0-9])\1{5,17}/; // 连续重复字符，检索 6 到 18 位的连续重复字符，如：1111111

verif.isNull = (parameter) => { //非空 | 必填
    if (parameter == null || parameter == undefined || parameter == "")
        return true;
    else
        return false;
};

verif.isNumber = (parameter) => {
    /* 只可输入数字或者小数 */
    if (!regular.test(parameter))
        return true;
    else
        return false;
}

verif.sTimeOreTime = (d1, d2) => { //验证开始时间和结束时间比较
    if (d1 > d2 && d1 != '' && d2 != '')
        return true;
    else
        return false;
}

verif.isPwd = (parameter) => { //密码不少于6位，且不能是6位以上连续重复的数字
    if (!reg0.test(parameter) || reg1.test(parameter))
        return true;
    else
        return false;
}