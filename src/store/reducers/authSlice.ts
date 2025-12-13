import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
   changePassword,
   getAccountData,
   login,
   refreshToken,
   register,
} from '@/api/auth';
import {
   getLocalStorageItem,
   removeLocalStorageItem,
   setLocalStorageItem,
} from '@/utils/localstorage';

import { RootState } from '../store';

export const registerUserThunk = createAsyncThunk<
   { accessToken: string; refreshToken: string },
   {
      email: string;
      password: string;
      age?: number;
   },
   { rejectValue: string }
>(
   'auth/registerUser',
   async ({ email, password, age }, { rejectWithValue }) => {
      try {
         return await register(email, password, age);
      } catch {
         return rejectWithValue('Error with registers user');
      }
   }
);

export const loginUserThunk = createAsyncThunk<
   { accessToken: string; refreshToken: string },
   { email: string; password: string },
   { rejectValue: string }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
   try {
      return await login(email, password);
   } catch {
      return rejectWithValue('Error with login user');
   }
});

export const getUserDataThunk = createAsyncThunk<
   {
      id: number;
      email: string;
      age: number;
      createdAt: string;
   },
   void,
   { state: RootState; rejectValue: string }
>('auth/getUserData', async (_, { getState, rejectWithValue }) => {
   try {
      const token = getState().authReducer.token;
      if (!token) return rejectWithValue('No auth token');
      return await getAccountData(token);
   } catch {
      return rejectWithValue('Error with smth');
   }
});

export const changePasswordThunk = createAsyncThunk<
   void,
   { oldPassword: string; newPassword: string },
   { state: RootState; rejectValue: string }
>(
   'auth/changePassword',
   async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
      try {
         const token = getState().authReducer.token;
         if (!token) return rejectWithValue('No auth token');
         await changePassword(oldPassword, newPassword, token);
      } catch {
         return rejectWithValue('Error with changing password');
      }
   }
);

export const refreshTokenThunk = createAsyncThunk<
   string,
   { refreshToken: string },
   { rejectValue: string }
>('auth/refreshToken', async ({ refreshToken: token }, { rejectWithValue }) => {
   try {
      return await refreshToken(token);
   } catch {
      return rejectWithValue('Error with refreshing token');
   }
});

interface AuthState {
   user: {
      id: number;
      email: string;
      age?: number;
      createdAt: string;
   } | null;
   token: string | null;
   status: 'idle' | 'loading' | 'failed';
   error: string | null;
}

const initialState: AuthState = {
   user: null,
   token: getLocalStorageItem('accessToken', null),
   status: 'idle',
   error: null,
};

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logoutUser: (state) => {
         state.user = null;
         state.token = null;
         removeLocalStorageItem('accessToken');
         removeLocalStorageItem('refreshToken');
         state.status = 'idle';
      },
   },
   extraReducers(builder) {
      builder.addCase(registerUserThunk.pending, (state) => {
         state.error = null;
         state.status = 'loading';
      });
      builder.addCase(registerUserThunk.rejected, (state, action) => {
         state.token = null;
         state.status = 'failed';
         state.error = action.payload || 'Registration failed';
      });
      builder.addCase(registerUserThunk.fulfilled, (state, action) => {
         state.token = action.payload.accessToken;
         setLocalStorageItem('accessToken', action.payload.accessToken);
         setLocalStorageItem('refreshToken', action.payload.refreshToken);
         state.error = null;
         state.status = 'idle';
      });
      builder.addCase(loginUserThunk.pending, (state) => {
         state.error = null;
         state.status = 'loading';
      });
      builder.addCase(loginUserThunk.rejected, (state, action) => {
         state.token = null;
         state.status = 'failed';
         state.error = action.payload || 'Login failed';
      });
      builder.addCase(loginUserThunk.fulfilled, (state, action) => {
         state.token = action.payload.accessToken;
         setLocalStorageItem('accessToken', action.payload.accessToken);
         setLocalStorageItem('refreshToken', action.payload.refreshToken);
         state.error = null;
         state.status = 'idle';
      });
      builder.addCase(getUserDataThunk.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(getUserDataThunk.rejected, (state) => {
         state.user = null;
         state.status = 'failed';
      });
      builder.addCase(getUserDataThunk.fulfilled, (state, action) => {
         state.user = action.payload;
         state.status = 'idle';
      });
      builder.addCase(changePasswordThunk.pending, (state) => {
         state.error = null;
         state.status = 'loading';
      });
      builder.addCase(changePasswordThunk.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.payload || 'Failed to change password';
      });
      builder.addCase(changePasswordThunk.fulfilled, (state) => {
         state.error = null;
         state.status = 'idle';
      });
      builder.addCase(refreshTokenThunk.pending, (state) => {
         state.status = 'loading';
      });
      builder.addCase(refreshTokenThunk.rejected, (state) => {
         state.status = 'failed';
      });
      builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
         state.token = action.payload;
         state.status = 'idle';
      });
   },
});
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
