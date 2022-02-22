import axios from 'axios'

export function getAPIClient(ctx?: any) {
  const token = localStorage.getItem('token')?.toString() as string

  const api = axios.create({
    baseURL: 'http://localhost:3333'
  })

  api.interceptors.request.use(config => {
    // console.log(config);
    return config;
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return api;
}