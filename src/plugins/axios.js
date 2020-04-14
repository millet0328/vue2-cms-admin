import axios from 'axios';

// 设置默认参数
axios.defaults.baseURL = 'http://localhost:3001/';

// 响应拦截器
axios.interceptors.response.use(function(response) {
	//在这里你可以判断后台返回数据携带的请求码
	if (response.status === 200) {
		return response.data
	} else {
		// 非200请求抱错
		throw Error(response.data.msg || '服务异常')
	}
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});


export default axios;
