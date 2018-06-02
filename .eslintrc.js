// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        browser: true,
    },
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    extends: ['plugin:vue/essential', 'airbnb-base'],
    // required to lint *.vue files
    plugins: [
        'vue',
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js',
            },
        },
    },
    // add your custom rules here
    rules: {
        /*
        * AirBnB JS rule overriddes.
        */

        // Disable console warning.
        'no-console': 'off',

        // Enforce consistent indentation.
        'indent': [ 'error', 4, { 'SwitchCase': 1 } ],

        // Allow unnecessarily quoted properties.
        'quote-props': 'off',

        // Allow dangling underscores to indicate private methods (like _internalMethod()).
        'no-underscore-dangle': 'off',

        // Enforce a maximum line length.
        'max-len': [ 'error', { 'code': 120 } ],

        // Don't try to resolve the dependencies.
        'import/no-unresolved': 'off',

        // Allow for missing file extensions in import statements.
        'import/extensions': 'off',

        // Require a space before function parenthesis.
        'space-before-function-paren': [ 'error', 'always' ],

        // Require "Stroustrup" brace style.
        'brace-style': [ 'error', 'stroustrup' ],

        // Enforce spaces inside of brackets.
        'array-bracket-spacing': [ 'error', 'always' ],

        // Do not enforce that class methods utilize this.
        'class-methods-use-this': 'off',

        // Allow the unary operators ++ and --.
        'no-plusplus': 'off',

        // Allow Reassignment of Function Parameters.
        'no-param-reassign': 'off',

        /*
        * Vue.js rule overriddes.
        */

        // Enforce consistent indentation in <template>.
        'vue/html-indent': [ 'error', 4 ],

        // Enforce v-bind directive usage in long form.
        'vue/v-bind-style': [ 'error', 'longform' ],

        // Enforce v-on directive usage in long form.
        'vue/v-on-style':  [ 'error', 'longform' ],

        // Don't require default value for props.
        'vue/require-default-prop': 'off',

        // don't require .vue extension when importing
        'import/extensions': ['error', 'always', {
            js: 'never',
            vue: 'never',
        }],

        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state', // for vuex state
                'acc', // for reduce accumulators
                'e' // for e.returnvalue
            ]
        }],

        // allow optionalDependencies
        'import/no-extraneous-dependencies': ['error', {
            optionalDependencies: ['test/unit/index.js'],
        }],

        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    }
}
