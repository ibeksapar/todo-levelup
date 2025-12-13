import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { changePasswordThunk } from '@/store/reducers/authSlice';

import { SForm } from './Form.styled';

export function ProfilePage() {
   const { user, status, error } = useAppSelector((state) => state.authReducer);
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [localError, setLocalError] = useState('');
   const dispatch = useAppDispatch();

   if (!user) return;
   const { email, age, createdAt } = user;
   const dateOfRegistration = new Date(createdAt).toLocaleDateString();

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setLocalError('');

      if (!oldPassword || !newPassword || !confirmPassword) {
         setLocalError('All fields are required');
         return;
      }

      if (newPassword.length < 6) {
         setLocalError('New password must be at least 6 characters');
         return;
      }

      if (newPassword !== confirmPassword) {
         setLocalError('New passwords do not match');
         return;
      }

      if (oldPassword === newPassword) {
         setLocalError('New password must be different from old password');
         return;
      }

      dispatch(changePasswordThunk({ oldPassword, newPassword }));
   }

   return (
      <div>
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
         <SForm method='post' onSubmit={handleSubmit}>
            <label htmlFor='old'>Old password</label>
            <input
               id='old'
               type='password'
               value={oldPassword}
               onChange={(e) => setOldPassword(e.target.value)}
               required
            />

            <label htmlFor='new'>New password</label>
            <input
               id='new'
               type='password'
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
               required
            />

            <label htmlFor='confirm'>Confirm password</label>
            <input
               id='confirm'
               type='password'
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               required
            />

            {localError && <p className='error'>{localError}</p>}
            {error && status === 'failed' && (
               <p className='error'>Server error: {error}</p>
            )}

            <button type='submit'>Change password</button>
         </SForm>
      </div>
   );
}
