import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { registerUserThunk } from '@/store/reducers/authSlice';

import { SForm } from './Form.styled';

export function RegisterForm() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [age, setAge] = useState('');
   const [localError, setLocalError] = useState('');
   const { error, status, token } = useAppSelector(
      (state) => state.authReducer
   );
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const isLoading = status === 'loading';

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLocalError('');

      if (!email || !password) return;

      if (!email.includes('@') || !email.includes('.')) {
         setLocalError('Invalid email');
         return;
      }

      if (password.length < 6) {
         setLocalError('Password must be at least 6 characters');
         return;
      }

      dispatch(registerUserThunk({ email, password, age: +age }));
   }

   useEffect(() => {
      if (status === 'idle' && token) navigate('/');
   }, [status, token, navigate]);

   return (
      <SForm method='post' onSubmit={handleSubmit}>
         <label htmlFor='email'>E-mail</label>
         <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
         />

         <label htmlFor='password'>Password</label>
         <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
         />

         <label htmlFor='age'>Age</label>
         <input
            id='age'
            type='text'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={isLoading}
         />

         {localError && <p className='error'>{localError}</p>}
         {error && status === 'failed' && (
            <p className='error'>Server error: {error}</p>
         )}

         <button type='submit'>{isLoading ? 'Loading' : 'Register'}</button>

         <Link to='/login'>Login Page</Link>
      </SForm>
   );
}
