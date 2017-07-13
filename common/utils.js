
export function checkTel(tel) {
    var reg = /^[1][3,4,5,8,7][0-9]{9}$/;
    return tel&& reg.test(tel);
}

//检查密码new
export function checkPwd(pwd) {
    var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[0-9A-Za-z]).{6,18}$/;
    return pwd&& reg.test(pwd);
}

//检查银行卡号
export function checkBankCard(bankcard) {
    var reg = /^(\d{16}|\d{19})$/;
    return bankcard&& reg.test(bankcard);
}

// 检查邮箱
export function checkEmail(email) {

    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]{2,4})+/;
    return email&&reg.test(email);
}

//检查验证码
export function checkVerifyCode(verifyCode) {
    var reg = /^\d{6}$/;

    return verifyCode&&reg.test(verifyCode);
}

/**
 * 触发下载文件
 * @param fileName 文件名
 * @param url url
 */
export function downloadFile(fileName, url) {
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    aLink.download = fileName;
    aLink.href = url;
    aLink.dispatchEvent(evt);
}