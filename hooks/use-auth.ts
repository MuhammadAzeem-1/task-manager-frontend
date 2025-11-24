import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, getErrorMessage } from '@/lib/api-client';
import { useAuthStore } from '@/store/auth-store';
import { 
  ApiResponse, 
  AuthResponse, 
  LoginCredentials, 
  SignupCredentials,
  User 
} from '@/lib/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Auth API calls
const authApi = {
  signup: async (credentials: SignupCredentials) => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/signup',
      credentials
    );
    return data;
  },

  login: async (credentials: LoginCredentials) => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return data;
  },

  getProfile: async () => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return data;
  },
};

// Signup mutation
export function useSignup() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (response) => {
      const { user, access_token } = response.data;
      setAuth(user, access_token);
      toast.success(response.message || 'Account created successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to create account');
    },
  });
}

// Login mutation
export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      const { user, access_token } = response.data;
      setAuth(user, access_token);
      toast.success(response.message || 'Logged in successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message || 'Failed to login');
    },
  });
}

// Logout
export function useLogout() {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return () => {
    clearAuth();
    queryClient.clear(); // Clear all cached data
    toast.success('Logged out successfully');
    router.push('/login');
  };
}

// Get current user profile
export function useProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

