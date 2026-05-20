import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginUser, registerUser, logout, clearAuthError } from '../store/slices/authSlice';
import { LoginPayload, RegisterPayload } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = (data: LoginPayload) => dispatch(loginUser(data));
  const register = (data: RegisterPayload) => dispatch(registerUser(data));
  const logoutUser = () => dispatch(logout());
  const clearError = () => dispatch(clearAuthError());

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logoutUser,
    clearError,
  };
};