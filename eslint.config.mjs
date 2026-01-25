import eslintPluginAstro from 'eslint-plugin-astro';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    // add the Astro plugin configuration
    ...eslintPluginAstro.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.astro'],
        rules: {
            // Disable parsing errors for TypeScript in frontmatter
            'no-undef': 'off',
        },
    },
    {
        rules: {
            // override/add rules settings here
        },
    },
];
