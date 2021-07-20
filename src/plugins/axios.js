import axios from 'axios';

import { Loading, Notification } from 'element-ui';
// 路由实例
import router from '@/router/';

// Loading实例
let loading;

// 设置默认参数
axios.defaults.baseURL = 'http://localhost:3001';

// 请求拦截器
axios.interceptors.request.use(function (config) {
	// 开启Loading
	loading = Loading.service({ background: 'rgba(0, 0, 0, 0.7)' });
	// 登录/注册API,不添加token
	if (config.url == '/admin/login' || config.url == '/admin/register') {
		return config;
	}
	// 获取token，判断是否已经登录
	let { token } = sessionStorage;
	// 拥有token,在headers头添加token
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function ({ status, data, response }) {
	// 关闭Loading
	loading.close();
	// 判断响应码
	switch (status) {
		case 200:
			return data;
			break;
		default:
			Notification.error({
				title: `错误：${status}`,
				message: '请查看network信息',
			});
			break;
	}
}, function ({ response: { status, data, statusText } }) {
	switch (status) {
		case 401:
			// 提示用户
			let expiredTime = new Date(data.inner.expiredAt).toLocaleString();
			Notification.error({
				title: `错误：${status}`,
				message: `token已过期，有效期至${expiredTime}，请重新登录！`,
			});
			// 获取当前路由，跳转登录
			let { fullPath } = router.history.current;
			router.replace({ path: '/login', query: { redirect: fullPath } });
			break;
		case 404:
			Notification.error({
				title: `错误：${status}`,
				message: 'api接口地址错误，请重新检查！',
			});
			break;
		case 500:
			Notification.error({
				title: `错误：${status}`,
				message: '后台接口错误，请联系后台开发！',
			});
			break;
		default:
			Notification.error({
				title: `错误：${status}`,
				message: statusText,
			});
			break;
	}
});


export default axios;
