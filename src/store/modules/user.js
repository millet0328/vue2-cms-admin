import { Admin } from "@/api/index";

export default {
	namespaced: true,
	state: {
		// 账户资料
		profile: {}
	},
	mutations: {
		// 储存账户资料
		setProfile(state, payload) {
			state.profile = payload;
		}
	},
	actions: {
		async loadProfile(context, id) {
			let { status, data } = await Admin.info({ id });
			// 提交mutation
			context.commit('setProfile', data);
		},
		async updateProfile(context, payload) {
			let { status, msg } = await Admin.edit(payload);
			if (status) {
				// 提交mutation,更新state
				context.commit('setProfile', payload);
				return msg;
			}
			return { status, msg };
		},
	},
	getters: {},
}
