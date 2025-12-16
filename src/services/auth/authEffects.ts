import { setTokens } from '@/store/reducers/authSlice';
import { AppDispatch } from '@/store/store';
import { setLocalStorageItem } from '@/utils/localstorage';

type TokenParams = {
   accessToken: string;
   refreshToken: string;
};

export function handleAuthSuccess(
   { accessToken, refreshToken }: TokenParams,
   dispatch: AppDispatch
) {
   setLocalStorageItem('accessToken', accessToken);
   setLocalStorageItem('refreshToken', refreshToken);
   dispatch(setTokens({ accessToken, refreshToken }));
}
