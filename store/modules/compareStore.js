import localStore from '../../common/store.min.js';

const state = {
	data:[],
}

// mutations
const mutations = {
	/***
	 * 设置当前比较的产品列表
	 */
	 SET_COMPARE_PRODUCT (state, { data }) {
		state.data = data;
		localStore.set("compareList",data);
	},
	/***
	 * 添加对比的产品
	 * @param state
	 * @param data
     */
	ADD_COMPARE_PRODUCT (state, { data }) {
		state.data.push(data);;
		localStore.set("compareList",state.data);
	}
}

const actions = {
	/***
	 * 设置当前比较的产品列表
	 * @param commit
	 * @param data
	 */
	SET_COMPARE_PRODUCT: ({commit}, {data})=> {
		commit("SET_COMPARE_PRODUCT", {data:data})
	},
	/***
	 * 添加对比的产品
	 * @param commit
	 * @param data
	 */
	ADD_COMPARE_PRODUCT: ({commit}, {data})=> {
		commit("ADD_COMPARE_PRODUCT", {data:data})
	}


}

export default {
	state,
	actions,
	mutations
}
