import axios, { AxiosInstance } from 'axios';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// Add token to requests if it exists
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Handle response errors
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token expired or invalid - clear auth and redirect to login
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);

export default apiClient;
