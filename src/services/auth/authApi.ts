import { setTokens } from '@/store/reducers/authSlice';
import { setLocalStorageItem } from '@/utils/localstorage';

import { baseApi } from '../baseApi';
import { handleAuthSuccess } from './authEffects';

type TokenParams = {
   accessToken: string;
   refreshToken: string;
};

type AuthParams = {
   email: string;
   password: string;
   age?: number;
};

type UserData = {
   id: number;
   email: string;
   age: number;
   createdAt: string;
};

type PasswordParams = {
   oldPassword: string;
   newPassword: string;
};

type AccessToken = string;
type RefreshToken = string;

export const authApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      loginUser: builder.mutation<TokenParams, AuthParams>({
         query: ({ email, password }) => ({
            url: '/auth/login',
            method: 'POST',
            body: { email, password },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               handleAuthSuccess(data, dispatch);
            } catch (err) {
               console.error(err);
            }
         },
      }),
      registerUser: builder.mutation<TokenParams, AuthParams>({
         query: ({ email, password, age }) => ({
            url: '/auth/register',
            method: 'POST',
            body: { email, password, age },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               handleAuthSuccess(data, dispatch);
            } catch (err) {
               console.error(err);
            }
         },
      }),
      getUserData: builder.query<UserData, void>({
         query: () => ({
            url: '/auth/me',
            method: 'GET',
         }),
      }),
      changePassword: builder.mutation<void, PasswordParams>({
         query: ({ oldPassword, newPassword }) => ({
            url: '/auth/change-password',
            method: 'POST',
            body: { oldPassword, newPassword },
         }),
      }),
      refreshToken: builder.mutation<AccessToken, RefreshToken>({
         query: (refreshToken) => ({
            url: '/auth/refresh',
            method: 'POST',
            body: { refreshToken },
         }),
         async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               setLocalStorageItem('accessToken', data);
               dispatch(setTokens({ accessToken: data }));
            } catch (err) {
               console.error(err);
            }
         },
      }),
   }),
});

export const {
   useLoginUserMutation,
   useRegisterUserMutation,
   useGetUserDataQuery,
   useChangePasswordMutation,
} = authApi;
