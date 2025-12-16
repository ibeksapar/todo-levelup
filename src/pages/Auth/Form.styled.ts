import styled from 'styled-components';

export const SForm = styled.form`
   display: flex;
   flex-direction: column;
   gap: 16px;
   max-width: 320px;
   width: 100%;

   label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-color);
   }

   input {
      padding: 10px 12px;
      font-size: 14px;

      background-color: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 6px;

      color: var(--text-color);

      transition: border-color 0.2s ease, box-shadow 0.2s ease,
         background-color 0.2s ease;

      &:focus {
         border-color: var(--primary-color);
         box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.25);
         outline: none;
      }

      &::placeholder {
         color: var(--input-placeholder);
      }
   }

   a {
      font-size: 14px;
      text-decoration: none;
      color: var(--primary-color);
      align-self: flex-start;

      &:hover {
         text-decoration: underline;
      }
   }

   div {
      display: flex;
      gap: 8px;
      flex-direction: column;
   }

   p.error {
      margin: -2px 0 0;
      font-size: 12px;
      color: #ff4d4dff;
   }

   button {
      margin-top: 8px;
      padding: 10px 14px;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;

      background-color: var(--primary-color);
      color: #fff;

      transition: background-color 0.2s ease, box-shadow 0.2s ease;

      &:hover {
         background-color: #1e88e5;
      }

      &:active {
         box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.35);
      }
   }
`;
