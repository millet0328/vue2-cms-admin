import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入模块
import menu from './modules/menu';
import user from './modules/user';

import createPersistedState from "vuex-persistedstate";

let store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		menu,
		user,
	},
	// 插件
	plugins: [createPersistedState()]
})

export default store
