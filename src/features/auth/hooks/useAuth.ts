import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, register, getMe } from '../api/authApi';
import { useAuthStore } from '../../../store/useAuthStore';
import { useWorkspaceStore } from '../../../store/useWorkspaceStore';
import type { LoginCredentials, RegisterData } from '../../../types';

// ── Query Keys ────────────────────────────────────────────────────────────
export const authKeys = {
  me: ['auth', 'me'] as const,
};

// ── Current user ──────────────────────────────────────────────────────────
export const useCurrentUser = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
    enabled: isAuthenticated,
    staleTime: Infinity,
  });
};

// ── Login ─────────────────────────────────────────────────────────────────
export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (tokens) => {
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
      setAuth(true);
      // Invalidate the me query so it re-fetches on next use
      queryClient.invalidateQueries({ queryKey: authKeys.me });
      navigate('/app');
    },
  });
};

// ── Register ──────────────────────────────────────────────────────────────
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: () => {
      navigate('/login?registered=1');
    },
  });
};

// ── Logout ────────────────────────────────────────────────────────────────
export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  const clearWorkspace = useWorkspaceStore((s) => s.clear);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    logout();
    clearWorkspace();
    queryClient.clear();
    navigate('/login');
  };
};
