/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#ffffff',
                foreground: '#121212',
                muted: '#808080',
                'off-white': '#f5f5f5',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'gradient-xy': 'gradient-xy 15s ease infinite',
            },
            keyframes: {
                'gradient-xy': {
                    '0%, 100%': {
                        'background-size': '400% 400%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '400% 400%',
                        'background-position': 'right center'
                    },
                }
            },
        },
    },
    plugins: [],
}
