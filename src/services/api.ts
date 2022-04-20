import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async config => {
  config.params = {appid: API_KEY, units: 'metric', lang: 'pt_br'};
  return config;
});

export default api;
