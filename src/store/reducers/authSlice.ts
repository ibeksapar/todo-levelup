import { createSlice } from '@reduxjs/toolkit';

import {
   getLocalStorageItem,
   removeLocalStorageItem,
} from '@/utils/localstorage';

interface AuthState {
   user: {
      id: number;
      email: string;
      age?: number;
      createdAt: string;
   } | null;
   token: string | null;
}

const initialState: AuthState = {
   user: null,
   token: getLocalStorageItem('accessToken', null),
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
      },
      setTokens: (state, action) => {
         state.token = action.payload.accessToken;
      },
   },
});

export const { logoutUser, setTokens } = authSlice.actions;
export default authSlice.reducer;
