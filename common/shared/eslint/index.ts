/* eslint-disable header/header */
import type { Rules } from '@antfu/eslint-config';
import os from 'node:os';
import path from 'node:path';
import typescriptParser from '@typescript-eslint/parser';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import jsdoc from 'eslint-plugin-jsdoc';
import noExternalImportsInFacade from './plugins/no-external-imports-in-facade';
import noFacadeImportsOutsideFacade from './plugins/no-facade-imports-outside-facade';
import noSelfPackageImports from './plugins/no-self-package-imports';

export const baseRules: Partial<Rules> = {
    curly: ['error', 'multi-line'],
    'antfu/if-newline': 'off',
    'no-param-reassign': ['warn'],
    'eol-last': ['error', 'always'],
    'ts/no-explicit-any': 'warn',
    'style/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'style/jsx-first-prop-new-line': ['warn', 'multiline'],
    'style/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        enums: 'always-multiline',
        functions: 'never',
    }],
    'unicorn/filename-case': [
        'error',
        {
            cases: {
                kebabCase: true,
                pascalCase: true,
            },
            ignore: [
                '^README-(\w+)?\\.md$',
                '^[a-z]{2}-[A-Z]{2}\.ts$',
                '^__tests__$',
                '^FUNDING.yml$',
                '^bug_report.yml$',
                '^bug_report.zh-CN.yml$',
                '^feature_request.yml$',
                '^feature_request.zh-CN.yml$',
            ],
        },
    ],
    'style/jsx-self-closing-comp': ['error', {
        component: true,
        html: true,
    }],
    'react-refresh/only-export-components': 'off',
    'no-empty-function': 'off',
    'style/arrow-parens': ['error', 'always'],
    'ts/no-redeclare': 'off',
    'style/spaced-comment': 'off',
    'accessor-pairs': 'warn',
    'style/indent-binary-ops': 'off',
    'ts/method-signature-style': 'off',
    'style/indent': ['error', 4, {
        ObjectExpression: 'first',
        SwitchCase: 1,
        ignoreComments: true,
    }],
    'perfectionist/sort-imports': 'warn',
    'perfectionist/sort-named-exports': 'warn',
    // 'antfu/consistent-chaining': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'sort-imports': [
        'error',
        {
            allowSeparatedGroups: false,
            //   ignoreCase: false,
            ignoreCase: true,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
    ],
    'react/no-unstable-context-value': 'warn',
    'react/no-unstable-default-props': 'warn',
    // 'command/command': 'off',
    'jsdoc/tag-lines': 'off',

    'no-restricted-imports': [
        'error',
        {
            paths: [
                {
                    name: 'clsx',
                    message: 'Please use `import { clsx } from \'@univerjs/design\'` instead.',
                },
            ],
        },
    ],

    // IMPORTANT: To ensure compatibility, some features of React 19 will be disabled.
    'react/no-forward-ref': 'off',
    'react/no-context-provider': 'off',
    'react-dom/no-render': 'off',
    'react/no-use-context': 'off',

    // TODO: debatable rules
    'test/prefer-lowercase-title': 'off',
    'antfu/top-level-function': 'off',
    'style/operator-linebreak': 'off',
    'unicorn/no-new-array': 'off',
    'unicorn/prefer-includes': 'off',
    'prefer-arrow-callback': 'off',
    'no-restricted-globals': 'off',
    'unicorn/prefer-string-starts-ends-with': 'warn',

    // TODO: just for compatibility with old code
    'unused-imports/no-unused-vars': 'warn',
    'style/jsx-closing-tag-location': 'warn',
    'ts/no-restricted-types': 'warn',
    'ts/no-wrapper-object-types': 'warn',
    'ts/no-empty-object-type': 'warn',
    'ts/no-unsafe-function-type': 'warn',
    'ts/no-unused-expressions': 'warn',
    'unicorn/prefer-dom-node-text-content': 'warn',
    'unicorn/prefer-number-properties': 'warn',
    'no-prototype-builtins': 'warn',
    'style/quotes': ['warn', 'single', { avoidEscape: true }],
    // 'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'ts/prefer-ts-expect-error': 'off',
    'ts/ban-ts-comment': 'off',
    'ts/no-duplicate-enum-values': 'off',
    'no-cond-assign': 'warn',
    'ts/no-use-before-define': 'warn',
    'test/no-identical-title': 'warn',
    'ts/no-non-null-asserted-optional-chain': 'warn',
    'no-restricted-syntax': 'warn',
    'prefer-regex-literals': 'warn',
    'ts/no-this-alias': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'no-new': 'warn',
    'unicorn/error-message': 'warn',
    'ts/prefer-literal-enum-member': 'warn',
    'style/jsx-curly-newline': ['warn', { multiline: 'forbid', singleline: 'forbid' }],
    'no-control-regex': 'warn',
    'style/jsx-wrap-multilines': 'warn',
    'ts/no-import-type-side-effects': 'warn',
    'style/quote-props': ['warn', 'as-needed'],
    'unicorn/number-literal-case': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'style/jsx-curly-brace-presence': 'warn',
    'style/multiline-ternary': 'warn',
    'unicorn/prefer-type-error': 'warn',
    'react/no-create-ref': 'warn',
};

export const typescriptPreset = (): any => {
    return {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            univer: {
                rules: {
                    'no-external-imports-in-facade': noExternalImportsInFacade,
                    'no-self-package-imports': noSelfPackageImports,
                    'no-facade-imports-outside-facade': noFacadeImportsOutsideFacade,
                },
            },
        },
        rules: {
            'ts/naming-convention': [
                'warn',
                // Interfaces' names should start with a capital 'I'.
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z0-9]',
                        match: true,
                    },
                },
                // Private fields of a class should start with an underscore '_'.
                {
                    selector: ['classMethod', 'classProperty'],
                    modifiers: ['private'],
                    format: ['camelCase'],
                    leadingUnderscore: 'require',
                },
            ],
            // 'ts/consistent-type-exports': 'warn',
        },
        languageOptions: {
            parser: typescriptParser,
        },
    };
};

export const univerSourcePreset = (): any => {
    return {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: [
            '**/__tests__/**/*',
            '**/*.spec.ts',
            '**/*.test.ts',
        ],
        rules: {
            'univer/no-self-package-imports': 'error',
            'univer/no-facade-imports-outside-facade': 'error',
        },
        languageOptions: {
            parser: typescriptParser,
        },
    };
};

export const facadePreset = (): any => {
    return {
        files: ['**/src/facade/**/*.ts'],
        ignores: [
            '**/__tests__/**/*',
            '**/*.spec.ts',
            '**/*.test.ts',
        ],
        rules: {
            'ts/explicit-function-return-type': 'error',
            'univer/no-external-imports-in-facade': 'error',
            ...jsdoc.configs.rules,
            'jsdoc/tag-lines': 'off',
        },
    };
};

export const tailwindcssPreset = (): any => {
    const isWindows = os.platform() === 'win32';
    const lineBreakStyle = isWindows ? 'windows' : 'unix';

    return {
        files: ['**/*.{jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            'better-tailwindcss': eslintPluginBetterTailwindcss,
        },
        settings: {
            'better-tailwindcss': {
                tailwindConfig: path.resolve(__dirname, '../tailwind/tailwind.config.ts'),
            },
        },
        rules: {
            // enable all recommended rules to warn
            ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
            // enable all recommended rules to error
            ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
            'better-tailwindcss/enforce-consistent-line-wrapping': ['error', {
                printWidth: 120,
                group: 'newLine',
                lineBreakStyle,
            }],
            'better-tailwindcss/no-unregistered-classes': 'off',
            'better-tailwindcss/no-conflicting-classes': 'off',
        },
    };
};

export const specPreset = (): any => {
    return {
        files: [
            '**/*.spec.ts',
            '**/__tests__/**/*.ts',
        ],
        rules: {
            'ts/explicit-function-return-type': 'off',
        },
    };
};
