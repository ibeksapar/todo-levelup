import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '@/store/store';

const API_URL = 'http://localhost:3001';

export const baseApi = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: API_URL,
      prepareHeaders: (headers, { getState }) => {
         const token = (getState() as RootState).authReducer.token;
         if (token) headers.set('Authorization', `Bearer ${token}`);
         return headers;
      },
   }),
   endpoints: () => ({}),
});
