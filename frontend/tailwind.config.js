/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#E11D48', // Red-600 (Emergency color)
                secondary: '#1E293B', // Slate-800
            }
        },
    },
    plugins: [],
}
