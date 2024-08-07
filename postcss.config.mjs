/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    '@unocss/postcss': {
      // Optional
      content: ['*.{html,js,ts,jsx,tsx}'],
    },
  },
};

export default config;
