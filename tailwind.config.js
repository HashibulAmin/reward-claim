/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom theme colors as per requirements
                purple: {
                    500: '#a855f7',
                },
                pink: {
                    500: '#ec4899',
                },
                blue: {
                    400: '#60a5fa',
                },
                yellow: {
                    400: '#facc15',
                },
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                wiggle: 'wiggle 1s ease-in-out infinite',
                float: 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
