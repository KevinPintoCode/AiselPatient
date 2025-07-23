/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './frontend/src/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    container: { center: true, padding: '1rem' },

    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#0d42a8',
                    secondary: '#4a3aff',
                    accent: '#10B981',
                    danger: '#EF4444',
                },
                'brand-background': '#0F172A',
            },
        },
    },
    plugins: [],
};