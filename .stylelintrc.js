module.exports = {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-sass-guidelines'
    ],
    defaultSeverity: 'error',
    plugins: [
        'stylelint-scss',
        'stylelint-prettier',
    ],
    ignoreFiles: [
        '**/*.tsx',
    ],
    rules: {
        'at-rule-no-unknown': null,
        'color-named': 'always-where-possible',
        indentation: null,
        'function-parentheses-space-inside': null,
        'max-nesting-depth': 4,
        'prettier/prettier': true,
        'property-no-vendor-prefix': null,
        'scss/at-rule-no-unknown': true,
        'selector-class-pattern': '.+',
    }
}
