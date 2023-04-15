module.exports = {
    extends: [
        'semistandard'
    ],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }]
    }
};
