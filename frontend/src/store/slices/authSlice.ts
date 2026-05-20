import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginPayload, RegisterPayload, AuthResponse } from '../../types';
import authService from '../../services/authService';
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_USER_KEY } from '../../utils/constants';

// ✅ SAFE PARSER FUNCTION (Add This at Top)
const parseStoredUser = <T>(value: string | null): T | null => {
  if (!value || value === 'undefined' || value === 'null') return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    console.warn('Failed to parse stored user:', e);
    return null;
  }
};

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// ✅ FIXED INITIAL STATE
const initialState: AuthState = {
  user: parseStoredUser<User>(localStorage.getItem(LOCAL_STORAGE_USER_KEY)), // ← Fixed Line 15
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || null,
  isAuthenticated: !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
  loading: false,
  error: null,
};

// Async Thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      console.log('Register API Response:', response); // 🔍 DEBUG: Kya aa raha backend se?
      return response;
    } catch (error: any) {
      // ✅ Better error handling
      const message = error.response?.data?.message 
                   || error.response?.data?.error 
                   || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);
      console.log('Login API Response:', response); // 🔍 DEBUG
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message 
                   || error.message 
                   || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    
    // ================== REGISTER HANDLER ==================
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        
        // ✅ FIX: Response validation before accessing
        const payload = action.payload as any; // Flexible access
        
        if (!payload) {
          state.error = 'No response from server';
          return;
        }

        // Handle different response formats from backend
        state.user = payload.user || payload.data?.user || payload.data || null;
        state.token = payload.token || payload.data?.token || payload.accessToken || null;
        state.isAuthenticated = !!state.token;

        // ✅ Only save to localStorage if we actually have data
        if (state.token) {
          localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, state.token!);
        }
        if (state.user) {
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(state.user));
        }

        console.log('Stored User:', state.user); // Debug
        console.log('Stored Token:', state.token); // Debug
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Registration failed';
        console.error('Registration Error:', action.payload); // Debug
      });

    // ================== LOGIN HANDLER ==================
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        
        // Same safe handling for login
        const payload = action.payload as any;
        
        state.user = payload.user || payload.data?.user || payload.data || null;
        state.token = payload.token || payload.data?.token || payload.accessToken || null;
        state.isAuthenticated = !!state.token;

        if (state.token) {
          localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, state.token!);
        }
        if (state.user) {
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(state.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Login failed';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;