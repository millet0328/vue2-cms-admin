export default {
	namespaced: true,
	state: {
		count: 32,
		uid: 1,
		sex: "男",
		age: 30,
	},
	mutations: {
		add(state, n) {
			state.count += n;
		},
	},
	actions: {},
	getters: {
		stage({ count }) {
			if (count < 60) {
				return "不及格";
			} else if (count >= 60 && count < 70) {
				return "及格";
			} else if (count >= 70 && count < 90) {
				return "良好";
			} else if (count >= 90 && count <= 100) {
				return "优秀";
			}
		}
	}
}
