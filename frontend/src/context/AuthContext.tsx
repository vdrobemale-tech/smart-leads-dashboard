import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (data: { email: string; password: string }) => any;
  register: (data: { name: string; email: string; password: string }) => any;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logoutUser,
    clearError,
  } = useAuth();

  // Token validation on mount
  useEffect(() => {
    const token = localStorage.getItem('lead_mgmt_token');
    if (token && !isAuthenticated) {
      // Token exists but state not hydrated — will be handled by Redux init
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout: logoutUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;