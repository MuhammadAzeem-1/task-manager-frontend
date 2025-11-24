import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse } from './types';

// API Base URL - NestJS backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('access_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      // Clear token and user data
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden - Insufficient permissions
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }
    
    // Return error for handling in components
    return Promise.reject(error);
  }
);

// Helper function to extract error message
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    
    // Backend error message
    if (axiosError.response?.data?.error) {
      return axiosError.response.data.error;
    }
    
    // Backend message
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    
    // HTTP error
    if (axiosError.response?.statusText) {
      return axiosError.response.statusText;
    }
    
    // Network error
    if (axiosError.message) {
      return axiosError.message;
    }
  }
  
  // Generic error
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

// API Helper Functions

/**
 * Upload profile picture for a user
 */
export async function uploadProfilePicture(userId: string, file: File): Promise<ApiResponse<any>> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post(
    `/users/${userId}/profile-picture`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
}

/**
 * Update user profile (name, password)
 */
export async function updateUserProfile(userId: string, data: { name?: string; password?: string }): Promise<ApiResponse<any>> {
  const response = await apiClient.put(`/users/${userId}`, data);
  return response.data;
}

