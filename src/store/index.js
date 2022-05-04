import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
// 模块
import AccountModule from './modules/Account/';
import MenuModule from './modules/Menu/';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		Account: AccountModule,
		Menu: MenuModule
	},
	plugins: [createPersistedState()],
})
