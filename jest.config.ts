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
    // node 環境で回す。検証しているのは renderToStaticMarkup の出力だけで DOM は
    // 要らず、静的エクスポートの実際のレンダリングも Node 上で起きるため本番に近い。
    // React 19 の react-dom/server はブラウザ版だと MessageChannel を要求し、
    // jsdom に無いので読み込み時点で落ちるという事情もある
    testEnvironment: 'node',
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
