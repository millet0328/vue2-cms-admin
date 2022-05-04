import axios from "axios";

const list = (params) => axios.get('/icon/list', { params });

export default {
    list,
}
