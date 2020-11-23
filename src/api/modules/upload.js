import axios from 'axios';

// 删除图片
const remove = (data) => axios.post('/upload', { params: data });

export default {
	remove,
}
