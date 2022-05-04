import { Admin } from '@/api/index';

const loadProfile = async ({ commit, state }, formData) => {
    let { status, data } = await Admin.info(formData);
    if (status) {
        // 储存到state
        commit('SetProfile', data);
    }
    return { status, data };
};

const editProfile = async ({ commit, state }, formData) => {
    let { status, msg } = await Admin.account(formData);
    if (status) {
        // 储存到state
        commit('SetProfile', formData);
    }
    return { status, msg };
};
export default {
    loadProfile,
    editProfile,
}
