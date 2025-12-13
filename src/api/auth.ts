const API_URL = 'http://localhost:3001';

const handleResponse = (res: Response, error: string) => {
   if (!res.ok) throw new Error(error);
   return res.json();
};

export const login = async (email: string, password: string) => {
   const { accessToken, refreshToken } = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         email,
         password,
      }),
   }).then((res) => handleResponse(res, 'Login failed'));

   return { accessToken, refreshToken };
};

export const register = async (
   email: string,
   password: string,
   age?: number
) => {
   const { accessToken, refreshToken } = await fetch(
      `${API_URL}/auth/register`,
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            email,
            password,
            age,
         }),
      }
   ).then((res) => handleResponse(res, 'Register failed'));

   return { accessToken, refreshToken };
};

export const refreshToken = async (refreshToken: string) => {
   const { accessToken } = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         refreshToken,
      }),
   }).then((res) => handleResponse(res, 'Refresh Token failed'));

   return accessToken;
};

export const getAccountData = async (accessToken: string) => {
   const data = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
         Authorization: `Bearer ${accessToken}`,
      },
   }).then((res) => handleResponse(res, 'Get account data failed'));

   return data;
};

export const changePassword = async (
   oldPassword: string,
   newPassword: string,
   accessToken: string
) => {
   return await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
   }).then((res) => {
      if (!res.ok) throw new Error('Change password failed');
   });
};
