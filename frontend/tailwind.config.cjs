/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // включаем переключение темы через класс
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
