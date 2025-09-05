import axios from 'axios';

const rawAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/api',
    withCredentials: true,
});

export default rawAxios;