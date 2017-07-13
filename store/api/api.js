import axios from 'axios'
import store from './../index.js'

//下面是测试环境配置
var HOST = "http://ydjr.dev.chengyiwm.com/goldman-api/";
if (process.env.NODE_ENV === 'production') {
    // 正式環境地質
    HOST = "http://api.chengyiwm.com/api/";
}

/**
 * 发送网络请求
 */
export function postRequest(action, obj, successFun, errorFun) {

	var commonData = {
        head : store.getters.getAjaxHeader,
        body : obj
    };
	axios.post(HOST+ action, commonData)
	  .then(function (response) {
	    successFun(response.data);
	  })
	  .catch(function (error) {
          if(typeof errorFun == 'function'){
              errorFun(error);
          }
	  });
}

// -------------------------------------------一些常量
/** 产品的分类 */
export const CATEGORY_TYPE = [{dictId:1,name:"集合信托"},{dictId:2,name:"资管计划"},{dictId:4,name:"证券基金"},{dictId:16,name:"股权基金"},{dictId:128,name:"海外投资"}];//{dictId:8192,name:"精选产品"},

/*******************************************************************************
 * 用户登录
 *
 * @param tel
 *            电话号码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $login(tel,pwd,souceFun, errorFun) {
    postRequest("login", {
        "mobile":tel,
        'pwd':pwd
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 短信验证码下发
 *
 * @param tel
 *            电话号码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $downVerifyCode(channel,tel,souceFun, errorFun) {
    postRequest("downVerifyCode", {
        'channel':channel,
        "mobile":tel
    }, souceFun, errorFun);
};

/*******************************************************************************
 * 用户注册
 *
 * @param tel
 *            电话号码
 * @param verifyCode
 *            验证码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $register(userName,tel,verifyCode,pwd,souceFun, errorFun) {
    postRequest("register", {
        "userName":userName,
        "mobile":tel,
        'verifyCode':verifyCode,
        'pwd':pwd
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 用户找回密码
 *
 * @param tel
 *            电话号码
 * @param verifyCode
 *            验证码
 * @param pwd
 *            密码
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            失败回调
 */
export function $findPwd(tel,verifyCode,pwd,souceFun, errorFun) {
    postRequest("findPwd", {
        "mobile":tel,
        'verifyCode':verifyCode,
        'pwd':pwd
    }, souceFun, errorFun);
};

/**
 * 获取产品产品-搜索建议词
 *
 * @param souceFun 成功回调
 * @param errorFun 失败回调
 */
export function $getSearchSug(query, souceFun, errorFun) {
	postRequest("getSearchSug", {
		'categoryId': "",
		'query': query
	}, souceFun, errorFun);
};
/*******************************************************************************
 * 获取产品列表信息
 *
 * @param souceFun 成功回调
 * @param errorFun 失败回调
 */
export function $getAppInfo(souceFun, errorFun){
    postRequest("getAppInfo", {}, souceFun, errorFun);
};
/*******************************************************************************
 * 获取产品列表
 *
 * @param start
 *            初始位置
 * @param pageSize
 *             页面个数
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getRichProduct(start, pageSize, sortId, categoryId, filterId, query, souceFun, errorFun) {
    console.log("$getRichProduct start = " + start);
    postRequest("getRichProduct", {
        'start' : start,
        'pageSize' : pageSize,
        'sortId' : sortId,
        'categoryId':categoryId,
        'filterId' : filterId,
        'query' : query
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取产品-获取产品文档
 *
 * @param start
 *            初始位置
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getProductDocument(prodId,souceFun, errorFun) {
    postRequest("getProductDocument", {
        'prodId': prodId
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取产品详情
 *
 * @param prodId
 *            产品id
 * @param platform
 *             产品平台
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getProductDetail(prodId,platform, souceFun, errorFun) {
    postRequest("getProductDetail", {
        'prodId' : prodId,
        'platform' : platform
    }, souceFun, errorFun);
};
/*******************************************************************************
 * 获取相关产品推荐
 * @param prodId
 *            产品id
 * @param souceFun
 *            成功回调
 * @param errorFun
 *            成功回调
 */
export function $getRelatedProduct(prodId, souceFun, errorFun) {
    postRequest("getRelatedProduct", {
        'prodId' : prodId,
    }, souceFun, errorFun);
};
/*******************************************************************************
/**
 * 获取比较的产品列表
 */
export function $getCompareProductList(souceFun, errorFun){
    postRequest("getCompareProductList", {
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 获取对比的产品信息
 * @param prodId 产品id
 */
export function $getCompareProductData(prodId,souceFun, errorFun){
    postRequest("getCompareProductData", {
        "prodId":prodId
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 邮件分享
 * @param prodId 产品id
 * @param email 反馈邮箱
 */
export function $shareProductbyMail(prodId,email,souceFun, errorFun){
    postRequest("shareProductbyMail", {
        "prodId":prodId,
        "email":email
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 收藏
 * @param prodId 产品id
 */
export function $setBookmark(prodId,souceFun, errorFun){
    postRequest("setBookmark", {
        "prodId":prodId
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 取消收藏
 * @param prodId 产品id
 */
export function $clearBookmark(prodId,souceFun, errorFun){
    postRequest("clearBookmark", {
        "prodId":prodId
    }, souceFun, errorFun);
}

/*******************************************************************************
 /**
 * 获取收藏列表
 */
export function $getBookmarkProduct(souceFun, errorFun) {
    postRequest("getBookmarkProduct", {
        "start": 0
    }, souceFun, errorFun);
}

/*******************************************************************************
 /**
 * 获取订单列表
 * @param start 起始位置
 * @param pageSize 页面个数
 * @param orderStatus 订单状态
 */
export function $searchOrder(start,pageSize,orderStatus,souceFun, errorFun) {
    postRequest("searchOrder", {
        "start": start,
        "pageSize": pageSize,
        "query": "",
        "order": {
            "orderStatus": orderStatus,
        }
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户-获取信息
 */
export function $getUserInfo(souceFun, errorFun) {
    postRequest("getUserInfo", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户-修改密码
 */
export function $modifyPwd(oldpwd,pwd,souceFun, errorFun) {
    postRequest("modifyPwd", {
        "oldpwd":oldpwd,
        "pwd":pwd
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 订单-获取交易记录列表
 */
export function $getOrderedProd(souceFun, errorFun) {
    postRequest("getOrderedProd", {
        start:0
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 帐单-获取账单记录列表
 */
export function $getAccountDetailList(opType,souceFun, errorFun) {
    postRequest("getAccountDetailList", {
        opType:opType
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 *订单-删除
 * @param listOrderId 订单id
 *
 */
export function $deleteOrder(listOrderId,souceFun, errorFun) {
    postRequest("deleteOrder", {
        listOrderId:"listOrderId"
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-获取列表
 *
 */
export function $listAddress(souceFun, errorFun) {
    postRequest("listAddress", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-增加
 * @param address对象
 */
export function $addAddress(address,souceFun, errorFun) {
    postRequest("addAddress", {
        "address":address
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-修改
 * @param address对象
 */
export function $updateAddress(address,souceFun, errorFun) {
    postRequest("updateAddress", {
        "address":address
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 地址-删除
 * @param addressId 地址id
 */
export function $deleteAddress(addressId,souceFun, errorFun) {
    postRequest("deleteAddress", {
        "address": {
            "addressId": addressId
        }
    }, souceFun, errorFun);
}

/*******************************************************************************
/**
 * 认证-取消信息
 */
export function $cancelAuthInfo(souceFun, errorFun) {
    postRequest("cancelAuthInfo", {}, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 银行卡-获取列表
 */
export function $listBankCard(souceFun, errorFun) {
    postRequest("listBankCard", {}, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 银行卡-设置默认
 * @param 银行卡id
 */
export function $setBankCardDefault(bankCardId,souceFun, errorFun) {
    postRequest("setBankCardDefault", {
        "bankCard": {
            "bankCardId": bankCardId
        }
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 银行卡-添加
 * @param 银行卡对象
 */
export function $addBankCard(bankCard,souceFun, errorFun) {
    postRequest("addBankCard", {
        "bankCard": bankCard
    }, souceFun, errorFun);
}
/*******************************************************************************
/**
 * 银行卡-删除
 * @param 银行卡id
 */
export function $deleteBankCard(bankCardId,souceFun, errorFun) {
    postRequest("deleteBankCard", {
        "bankCard": {
            "bankCardId":bankCardId
        }
    }, souceFun, errorFun);
}

/*******************************************************************************
 /**
 * 分享-获取分享列表
 */
export function $getProductShareList(souceFun, errorFun) {
    postRequest("getProductShareList", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 分享-获取分享列表详情
 */
export function $getProductShareDetail(prodId,souceFun, errorFun) {
    postRequest("getProductShareDetail", {
        prodId:prodId
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 认证-获取信息
 */
export function $getAuthInfo(souceFun, errorFun) {
    postRequest("getAuthInfo", {}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 认证-上传信息
 * @param 上传对象
 */
export function $uploadAuthInfo(authInfo,souceFun, errorFun) {
    postRequest("uploadAuthInfo", {
        "authInfo": authInfo
    }, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户反馈
 *@param feedback 反馈信息对象
 */
export function $feedback(feedback,contact, souceFun, errorFun) {
    postRequest("feedback", {"feedback":{
        "feedback": feedback,
        "contact":contact
    }}, souceFun, errorFun);
}
/*******************************************************************************
 /**
 * 用户退出
 */
export function $logout(souceFun, errorFun) {
    postRequest("logout", {}, souceFun, errorFun);
}


//--------------------------------------------------------------------window.localStorage 保存对象 用户ID 昵称



export function pushObj(key,value){
    if(typeof value =="object"){
        window.localStorage.setItem(key,JSON.stringify(value));
        return ;
    }
    throw new error("value type is not object ");
}

export function fetchObj(key){
    var value = window.localStorage.getItem(key);
    if(!value){
        return [];
    }
    try{
        return JSON.parse(value);
    }catch(e){
        return [];
    }
}

/***set
   * 保存对象
   * @param type key
   * @param obj  对象
   */
export function saveObj(type,obj){
    window.localStorage.setItem(type,JSON.stringify(obj));
}

/***
   * 获取对象
   * @param type
   * @returns {*}
   */
export function getObj(type){
    return window.localStorage.getItem(type) ? JSON.parse(window.localStorage.getItem(type)) : null;
}

//--------------------------------------------------------------------window.sessionStorage 保存对象
/***set
   * 保存对象
   * @param type key
   * @param obj  对象
   */
export  function sessionSaveObj(type,obj){
    window.sessionStorage.setItem(type,JSON.stringify(obj));
}

/***
   * 获取对象
   * @param type
   * @returns {*}
   */
export function sessionGetObj(type){
    return window.sessionStorage.getItem(type) ? JSON.parse(window.sessionStorage.getItem(type)) : null;
}
/***
* 清空window.localStorage的全部数据
*/
export function clearUserData(){
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("skey");
    window.localStorage.removeItem("userName");
    //window.localStorage.clear();
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
};
// -----------------------------------常用动画

/**
 * 收藏飞入动画
 * @param from 飞入的id
 * @param target 目标飞入的id
 * @param callback 动画完成回调
 */
export function flyTo(from, target , callback) {
    var flyElm = $(from).clone().css('opacity', '0.7');
    flyElm.css({
        'z-index': 99999,
        'display': 'block',
        'position': 'absolute',
        'top': $(from).offset().top + 'px',
        'left': $(from).offset().left + 'px',
        'width': $(from).width() + 'px',
        'height': $(from).height() + 'px'
    });
    $('body').append(flyElm);
    flyElm.animate({
        top: $(target).offset().top,
        left: $(target).offset().left,
        width: 50,
        height: 50
    }, 'slow','swing',function(){
        flyElm.hide();
    });
};
// -----------------------------------合法性验证
//检查电话号new
export function checkTel2(tel) {
    var reg = /^[1][3,4,5,8,7][0-9]{9}$/;
    return tel&& reg.test(tel);
}

//检查密码new
export function checkPwd2(pwd) {
    var reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[0-9A-Za-z]).{6,18}$/;
    return pwd&& reg.test(pwd);
}

//检查银行卡号
export function checkBankCard(bankcard) {
    var reg = /^(\d{16}|\d{19})$/;
    return bankcard&& reg.test(bankcard);
}














export const tips = new Array("用户名不能为空", "用户名不能是数字或特殊字符，且长度不可超过十位",
    "手机号不能为空", "请输入11位的手机号码", "密码不能为空", "密码由6-18位的数字字母或任意字符组合而成",
    "验证码不能为空", "验证码由六位数字组成", "验证码输入错误","预约姓名不能为空","邮箱不能为空","邮箱格式不正确");

/**是否为空*/
export function checkNull(text){
    return (!text || text == null || text == "" || text == undefined || text == 'undefined');
};

/**
 *
 * @param {Object} username 待检测的用户名
 * @param type 属性属于哪个页面
 * @param {Object} tipsObject 提示的object
 */

export function checkUsername(username) {
    var nickName = /^[\u4e00-\u9fa5a-zA-Z]{2,10}$/;
    if (!username) {
        $(".userName").html(tips[0]);

        return false;
    }
    $(".userName").html("&nbsp;");
    return true;
}

//检查验证码
export function checkVerifyCode(verifyCode) {
    var checkCode = /^\d{6}$/;
    if (!verifyCode) {
        $(".verifyCode").html(tips[6]);
        return false;
    } else {
        if (!checkCode.test(verifyCode)) {
            $(".verifyCode").html(tips[7]);
            return false;
        }
    }
    $(".verifyCode").html("&nbsp;");
    return true;
}
//检查邮箱
export function checkEmail(email) {

    var checkEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]{2,4})+/;
    if (!email) {
        $(".email").html(tips[10]);
        return false;
    } else {
        if (!checkEmail.test(email)) {
            $(".email").html(tips[11]);
            return false;
        }
    }
    $(".email").html("");
    return true;
}
