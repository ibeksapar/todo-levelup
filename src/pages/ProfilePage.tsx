import { useForm } from 'react-hook-form';

import { SForm } from '@/pages';
import {
   useChangePasswordMutation,
   useGetUserDataQuery,
} from '@/services/auth/authApi';
import { getErrorMessage } from '@/utils/errors';

type PasswordsFormValues = {
   oldPassword: string;
   newPassword: string;
   confirmPassword: string;
};

export function ProfilePage() {
   const {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
   } = useForm<PasswordsFormValues>();
   const { data, isLoading: isLoadingUserData } = useGetUserDataQuery();
   const [
      changePassword,
      { error: changePasswordError, isLoading: isChangingPassword },
   ] = useChangePasswordMutation();

   if (!data) return null;
   const { email, age, createdAt } = data;
   const dateOfRegistration = new Date(createdAt).toLocaleDateString();

   async function onSubmit(data: PasswordsFormValues) {
      const { oldPassword, newPassword } = data;
      try {
         await changePassword({ oldPassword, newPassword }).unwrap();
         reset();
      } catch (error) {
         void error;
      }
   }

   return (
      <div>
         {isLoadingUserData ? (
            <div>'Loading...'</div>
         ) : (
            <div>
               <ul>
                  <li>
                     <span>Email</span>
                     <p>{email}</p>
                  </li>
                  <li>
                     <span>Age</span>
                     <p>{age}</p>
                  </li>
                  <li>
                     <span>Date of registration</span>
                     <p>{dateOfRegistration}</p>
                  </li>
               </ul>
            </div>
         )}

         <SForm onSubmit={handleSubmit(onSubmit)}>
            <div>
               <label htmlFor='oldPassword'>Old password</label>
               <input
                  id='oldPassword'
                  type='password'
                  disabled={isChangingPassword}
                  {...register('oldPassword', {
                     required: 'This field is required',
                  })}
               />
               {errors?.oldPassword?.message && (
                  <p className='error'>{errors.oldPassword.message}</p>
               )}
            </div>

            <div>
               <label htmlFor='newPassword'>New password</label>
               <input
                  id='newPassword'
                  type='password'
                  disabled={isChangingPassword}
                  {...register('newPassword', {
                     required: 'This field is required',
                     minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                     },
                  })}
               />
               {errors?.newPassword?.message && (
                  <p className='error'>{errors.newPassword.message}</p>
               )}
            </div>

            <div>
               <label htmlFor='confirmPassword'>Confirm password</label>
               <input
                  id='confirmPassword'
                  type='password'
                  disabled={isChangingPassword}
                  {...register('confirmPassword', {
                     required: 'This field is required',
                     validate: (value) =>
                        value === getValues().newPassword ||
                        'New passwords do not match',
                  })}
               />
               {errors?.confirmPassword?.message && (
                  <p className='error'>{errors.confirmPassword.message}</p>
               )}
            </div>

            {changePasswordError && (
               <p className='error'>
                  Server error: {getErrorMessage(changePasswordError)}
               </p>
            )}

            <button type='submit' disabled={isChangingPassword}>
               {isChangingPassword ? 'Loading' : 'Change password'}
            </button>
         </SForm>
      </div>
   );
}
