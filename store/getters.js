//////////////////////当前的登录状态
export const isLogin = state => {
    return state.loginStore.isLogin;
}
export const getUserName = state=> {
    return state.loginStore.data.userName;
}
export const getUserId = state=> {
    return state.loginStore.data.userId;
}
export const getSkey= state=> {
    return state.loginStore.data.skey;
}
export const getCurentTel = state=>{
    return state.loginStore.data.tel;
}

/***
 * 对比产品列表
 * @param state State
 * @returns {*}
 */
export const getCompareProducts = state=>{
    return state.compareStore.data;
}

/***
 * 获取当前的产品分类id
 * @param state State
 */
export const getActiveCategoryId = state=>{
    return state.categoryStore.activeCategoryId;
}

/***
 * ajax请求的通用头部信息
 * @param state
 * @returns {{userId: (*|string), skey: *, platform: string, imei: string, appVersion: string, cityId: string, platformVersion: string, deviceId: string, channel: string, protoVersion: number, isPreview: number}}
 */
export const getAjaxHeader = state =>{
    const userId = state.loginStore.data.userId
    const skey = state.loginStore.data.skey;
    const header = {
        userId: userId,
        skey: skey,
        platform: "pcweb",
        imei: "",
        appVersion: "",
        cityId: "",
        platformVersion: "",
        deviceId: "",
        channel: "",
        protoVersion: 1,
        isPreview: 2
    };
    return header;
}

