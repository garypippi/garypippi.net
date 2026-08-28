import next from 'eslint-config-next/core-web-vitals'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

const config = [
    {
        ignores: [
            '.next/**',
            'out/**',
            'cli/dist/**',
            'next-env.d.ts',
            '**/*.module.css.d.ts',
        ],
    },
    ...next,
    ...tseslint.configs.recommended,
    prettier,
    {
        rules: {
            // 画像も動画も別ホストから配信するので next/image は使わない
            '@next/next/no-img-element': 'off',
            // このサイトは next/link を使わず素の <a> で統一している
            '@next/next/no-html-link-for-pages': 'off',
        },
    },
]

export default config
