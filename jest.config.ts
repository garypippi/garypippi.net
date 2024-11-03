import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    // [...]
    //extensionsToTreatAsEsm: ['.ts'],
    // moduleNameMapper: {
    //     '^(\\.{1,2}/.*)\\.js$': '$1'
    // },
    testEnvironment: 'jsdom',
    transform: {
        // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
        // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/spec/tsconfig.json',
                //useESM: true
            },
        ],
    },
}

export default jestConfig
