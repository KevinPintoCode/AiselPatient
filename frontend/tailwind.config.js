/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    container: { center: true, padding: '1rem' },

    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#FFB703',
                    secondary: '#F3F4F6',
                    accent: '#10B981',
                    danger: '#EF4444',
                },
                'brand-background': '#0F172A',
            },
        },
    },
    plugins: [],
}; 