import type { JestConfigWithTsJest } from 'ts-jest'

/**
 * mdast / micromark / smol-toml 系は ESM 専用パッケージなので、
 * node_modules の中でもこれらだけは ts-jest に CJS へ変換させる
 */
const esmPackages = [
    'micromark.*',
    'mdast-util-.*',
    'unist-util-.*',
    'character-entities',
    'decode-named-character-reference',
    'devlop',
    'longest-streak',
    'markdown-table',
    'zwitch',
    'smol-toml',
]

const jestConfig: JestConfigWithTsJest = {
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/spec/setupEnv.ts'],
    // ビルド成果物の中を走査させない
    modulePathIgnorePatterns: ['<rootDir>/out/', '<rootDir>/.next/'],
    moduleNameMapper: {
        '\\.module\\.css$': '<rootDir>/spec/cssModuleStub.js',
        '^@lib/(.*)$': '<rootDir>/lib/$1',
    },
    transformIgnorePatterns: [`/node_modules/(?!(${esmPackages.join('|')})/)`],
    transform: {
        '^.+\\.[tj]sx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/spec/tsconfig.json',
            },
        ],
    },
}

export default jestConfig
