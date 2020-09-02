export default {
	namespaced: true,
	state: {
		// 折叠菜单
		isCollapse: false,
	},
	mutations: {
		// 折叠菜单
		toggleMenu(state) {
			state.isCollapse = !state.isCollapse;
		},
	},
	actions: {},
	getters: {},
}
