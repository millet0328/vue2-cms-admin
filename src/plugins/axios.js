import axios from 'axios';
import { Loading, Message } from 'element-ui';

// 路由实例
import router from '@/router/index';

// Loading实例
let loading;

// 设置默认参数
axios.defaults.baseURL = 'http://localhost:3001';

// 请求拦截器
axios.interceptors.request.use(function(config) {
	// 开启Loading
	loading = Loading.service({ background: 'rgba(0, 0, 0, 0.7)' });
	// 登录/注册API,不添加token
	if (config.url == '/admin/login' || config.url == '/admin/register') {
		return config;
	}
	// 获取token，判断是否已经登录
	let token = sessionStorage.token;
	// 没有token,提示用户，跳转登录页面
	if (!token) {
		Message.error('token令牌失效，请重新登录！');
		// 延迟2秒，跳转页面
		setTimeout(() => {
			router.replace('/');
			loading.close();
		}, 2000);
	}
	// 拥有token,在headers头添加token
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(res) {
	let { status, data, response } = res;
	// 关闭Loading
	loading.close();
	// 判断响应码
	switch (status) {
		case 200:
			return data;
			break;
		default:
			Message.error(response.statusText);
			break;
	}
}, function({ response: { status, data } }) {
	// 拦截401状态码
	if (status == 401) {
		Message.error({
			message: `Token已过期，请重新登录！`,
			onClose: () => {
				router.replace('/login');
				loading.close();
			}
		});
	}
	// 对响应错误做点什么
	return Promise.reject(data);
});


export default axios;
