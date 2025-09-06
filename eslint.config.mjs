export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'prefer-const': 'error',
            'no-var': 'error',
        },
    },
    {
        ignores: ['dist/', 'node_modules/', 'tests/', 'coverage/'],
    },
];
