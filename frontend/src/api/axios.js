import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to add the JWT token to headers
api.interceptors.request.use(
    (config) => {
        let userInfo = null;
        try {
            const storedInfo = localStorage.getItem('userInfo');
            userInfo = storedInfo ? JSON.parse(storedInfo) : null;
        } catch (error) {
            console.error('Failed to parse userInfo in interceptor:', error);
        }

        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
