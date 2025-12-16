import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const getErrorMessage = (
   error: FetchBaseQueryError | SerializedError
) => {
   if ('status' in error && 'data' in error && typeof error.data === 'object') {
      return (error.data as { message?: string }).message || 'Unknown error';
   }

   if ('message' in error) {
      return error.message;
   }

   return 'Unknown error';
};
