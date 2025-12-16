import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks/hooks';
import { SForm } from '@/pages';
import { useRegisterUserMutation } from '@/services/auth/authApi';
import { getErrorMessage } from '@/utils/errors';

type RegisterFormValues = {
   email: string;
   password: string;
   age?: number;
};

export function RegisterForm() {
   const { token } = useAppSelector((state) => state.authReducer);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormValues>();
   const [registerUser, { isLoading, isSuccess, error }] =
      useRegisterUserMutation();
   const navigate = useNavigate();

   function onSubmit(data: RegisterFormValues) {
      registerUser({ ...data, age: data.age ? Number(data.age) : undefined });
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

         <div>
            <label htmlFor='age'>Age</label>
            <input
               id='age'
               type='number'
               disabled={isLoading}
               {...register('age', {
                  min: {
                     value: 1,
                     message: 'Age must be positive',
                  },
               })}
            />
         </div>

         {error && (
            <p className='error'>Server error: {getErrorMessage(error)}</p>
         )}

         <button type='submit' disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
         </button>

         <Link to='/login'>Already have an account?</Link>
      </SForm>
   );
}
