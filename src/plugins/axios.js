import axios from 'axios';

import { Notification } from 'element-ui';
// 路由实例
import router from '@/router/';

// 设置默认BaseURL
axios.defaults.baseURL = 'http://localhost:3001';

//跨域请求，携带cookie
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(function (config) {
	// 登录、注册API可以不携带token
	if (config.url.includes('/admin/login') || config.url.includes('/admin/register')) {
		return config;
	}
	// 获取token，判断是否已经登录
	let { token } = sessionStorage;
	// 拥有token,在headers头添加token
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function ({ status, data, response }) {
	// 判断响应码
	if (status === 200) {
		return data
	}
}, function ({ config: { url }, message, response }) {
	// response == undefined，请求未发出，跨域错误
	if (!response) {
		Notification.error({
			title: message,
			message: `API接口："${url}" 错误!`
		});
		return;
	}
	// response响应返回
	let { status, data, statusText } = response;

	switch (status) {
		case 401:
			// 提示用户
			let expiredTime = new Date(data.inner.expiredAt).toLocaleString();
			Notification.error({
				title: `错误：${status}`,
				message: `token已过期，有效期至${expiredTime}，请重新登录！`,
			});
			// 获取当前路由地址
			let { fullPath } = router.history.current;
			// 强制跳转登录，携带redirect参数，实现重定向
			router.replace({ path: '/login', query: { redirect: fullPath } });
			break;
		case 404:
			Notification.error({
				title: `错误：${status}`,
				message: `API接口："${url}" 地址不存在!`,
			});
			break;
		case 500:
			Notification.error({
				title: `错误：${status}`,
				message: `API接口："${url}" 错误，请联系后台开发！`,
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
