import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --bg-color: #ffffff;
    --text-color: #111111;
    --primary-color: #42a5f5;
    --danger-color: #ff4d4d;
    --scrollbar-thumb: #bababa;
    --scrollbar-track: rgba(0, 0, 0, 0.1);
    --input-bg: #ffffff;
    --input-border: rgba(0, 0, 0, 0.23);
    --input-placeholder: rgba(0, 0, 0, 0.4);
  }

  [data-theme='dark'] {
    --bg-color: #242424;
    --text-color: rgba(255, 255, 255, 0.87);
    --primary-color: #42a5f5;
    --danger-color: #ff4d4d;
    --scrollbar-thumb: #bababa;
    --scrollbar-track: rgba(255, 255, 255, 0.1);
    --input-bg: #1e1e1e;
    --input-border: rgba(255, 255, 255, 0.15);
    --input-placeholder: rgba(255, 255, 255, 0.4);
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  *::-webkit-scrollbar {
    width: 4px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb);
    border-radius: 4px;
  }
  *::-webkit-scrollbar-track {
    background-color: var(--scrollbar-track);
    border-radius: 4px;
  }
`;
