/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ['prettier-plugin-tailwindcss'],
    semi: true,
    tabWidth: 4,
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
    jsxSingleQuote: false,
    bracketSpacing: false,
};

export default config;
