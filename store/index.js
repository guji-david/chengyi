import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import productListStore from './modules/productListStore'
import loginStore from './modules/loginStore'
import categoryStore from './modules/categoryStore'
import compareStore from './modules/compareStore'

Vue.use(Vuex);

const store = new Vuex.Store({
	getters,
	modules: {
	    productListStore,
		loginStore,
	    categoryStore,
		compareStore,
	},
});


export default store