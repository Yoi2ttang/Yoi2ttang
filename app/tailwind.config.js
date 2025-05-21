/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Pretendard', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        caption: '14px',
        sm: '16px',
        md: '18px',
        lg: '18px',
        titleSm: '20px',
        titleMd: '26px',
        titleLg: '30px',
      },
      colors: {
        yoi: {
          50: '#fff3f1',
          100: '#ffe4df',
          200: '#ffcec5',
          300: '#ffac9d',
          400: '#ff7c64',
          500: '#ff5434',
          600: '#ed3715',
          700: '#c82a0d',
          800: '#a5270f',
          900: '#882614',
          950: '#4b0f04',
        },
        kakao: {
          yellow: '#fee500',
          brown: '#392020',
        },
        animal: {
          mouse: '#bebebe',
          cow: '#e2be8d',
          tiger: '#ffb950',
          rabbit: '#ac2fd7',
          dragon: '#88bfa7',
          snake: '#4f93d2',
          horse: '#ad6b23',
          sheep: '#f2e7d6',
          monkey: '#f2cc4d',
          chicken: '#ef3a5d',
          dog: '#9d9d9d',
          pig: '#f5b8c3',
        },
        black: '#262626',
        white: '#fefefe',
      },
      spacing: {
        'yoi-header': '56px',
        'yoi-navbar': '56px',
      },
      maxWidth: {
        'yoi-container': '600px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
