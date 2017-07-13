import * as API from './api'
const LRU = process.BROWSER ? null : require('lru-cache')

const cache = process.BROWSER ? null : (process.__API_CACHE__ || (process.__API_CACHE__ = createCache()))

function createCache() {
    return LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15 // 15 min cache
    })
}

// create a single api instance for all server-side requests
const api = process.BROWSER
    ? API
    : (process.__API__ || (process.__API__ = createServerSideAPI()))

function createServerSideAPI () {
    const api = API;
    return api
}



// 产品缓存的前缀
const PRODUCT_CACHE_PREFIX = 'FETCH_PRODUCT_LIST - ';

/**
 * 获取产品列表
 */
export function $getRichProduct(start, pageSize, sortId, categoryId, filterId, query, souceFun, errorFun) {
    var cacheKey = PRODUCT_CACHE_PREFIX + start + pageSize + sortId + categoryId + filterId + query;
    if(cache && cache.has(cacheKey)) {
        return Promise.resolve(cache.get(cacheKey))
    } else {
        return new Promise(function(resolve, reject) {
            api.$getRichProduct(start, pageSize, sortId, categoryId, filterId, query, function(res) {
                if(cache) {
                    cache.set(cacheKey, res)
                }
                resolve(res);
                souceFun(res);
            },errorFun);
        });
    }
}

/**
 * 产品基本信息。分类信息、版本号等
 */
export function $getAppInfo(souceFun, errorFun){
	var cacheKey = 'getAppInfo';
    if(cache && cache.has(cacheKey)) {
        return Promise.resolve(cache.get(cacheKey))
    } else {
        return new Promise(function(resolve, reject) {
            api.$getAppInfo(function(res) {
                if(cache) {
                    cache.set(cacheKey, res)
                }
                resolve(res);
                souceFun(res);
            },errorFun);
        });
    }
};