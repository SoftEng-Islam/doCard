import apiClient from './api.client';
import type { IAuthResponse, IUserResponse } from '../../../shared/types/models';
import type { ApiResponse } from '../../../shared/types/api';

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	username: string;
	email: string;
	password: string;
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<IAuthResponse> => {
	const response = await apiClient.post<ApiResponse<IAuthResponse>>(
		'/auth/login',
		credentials
	);
	return response.data.data;
};

// Register new user
export const registerUser = async (
	credentials: RegisterCredentials
): Promise<IAuthResponse> => {
	const response = await apiClient.post<ApiResponse<IAuthResponse>>(
		'/auth/register',
		credentials
	);
	return response.data.data;
};

// Get current user
export const getCurrentUser = async (): Promise<{ user: IUserResponse }> => {
	const response = await apiClient.get<ApiResponse<{ user: IUserResponse }>>('/auth/me');
	return response.data.data;
};
