import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks/hooks';
import { SForm } from '@/pages';
import { useLoginUserMutation } from '@/services/auth/authApi';
import { getErrorMessage } from '@/utils/errors';

type LoginFormValues = {
   email: string;
   password: string;
};

export function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormValues>();
   const { token } = useAppSelector((state) => state.authReducer);

   const [loginUser, { isLoading, isSuccess, error }] = useLoginUserMutation();
   const navigate = useNavigate();

   function onSubmit(data: LoginFormValues) {
      loginUser(data);
   }

   useEffect(() => {
      if (isSuccess && token) navigate('/');
   }, [isSuccess, token, navigate]);

   return (
      <SForm onSubmit={handleSubmit(onSubmit)}>
         <div>
            <label htmlFor='email'>E-mail</label>
            <input
               id='email'
               type='email'
               disabled={isLoading}
               {...register('email', {
                  required: 'This field is required',
               })}
            />
            {errors?.email?.message && (
               <p className='error'>{errors.email.message}</p>
            )}
         </div>

         <div>
            <label htmlFor='password'>Password</label>
            <input
               id='password'
               type='password'
               disabled={isLoading}
               {...register('password', {
                  required: 'This field is required',
                  minLength: {
                     value: 6,
                     message: 'Password must be at least 6 characters',
                  },
               })}
            />
            {errors?.password?.message && (
               <p className='error'>{errors.password.message}</p>
            )}
         </div>

         {error && (
            <p className='error'>Server error: {getErrorMessage(error)}</p>
         )}

         <button type='submit' disabled={isLoading}>
            {isLoading ? 'Logging in' : 'Login'}
         </button>

         <Link to='/register'>Don't have an account?</Link>
      </SForm>
   );
}
