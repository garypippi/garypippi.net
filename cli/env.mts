import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

/**
 * `.env.local` の最小パーサ。
 *
 * dotenv を足さないのは、ここで必要なのが `KEY=VALUE` の素朴な読み取りだけで、
 * 引用符の解釈や変数展開まではこの CLI では使っていないため。Next 側は Next
 * 自身のローダが読むので、こちらの実装と競合しない。
 */
const parseEnvFile = (text: string): Record<string, string> => {
    const env: Record<string, string> = {}
    for (const line of text.split('\n')) {
        const matched = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line)
        if (!matched || /^\s*#/.test(line)) {
            continue
        }
        env[matched[1]] = matched[2].replace(/^(['"])([^]*)\1$/, '$2')
    }
    return env
}

/**
 * 環境変数を解決する。`process.env` を優先し、無ければリポジトリ root の
 * `.env.local` を見る。CI は `.env.local` を作らず job の `env:` に置くので、
 * この優先順でないと CI で壊れる。
 */
export const getEnv = (key: string): string => {
    const fromProcess = process.env[key]
    if (fromProcess) {
        return fromProcess
    }
    const path = resolve(process.cwd(), '.env.local')
    if (!existsSync(path)) {
        return ''
    }
    return parseEnvFile(readFileSync(path, 'utf8'))[key] ?? ''
}

/**
 * 記事の置き場所。`--blog` で上書きできる。
 */
export const resolveBlogPath = (override?: string): string => {
    const path = override || getEnv('BLOG_PATH')
    if (!path) {
        throw new Error(
            'BLOG_PATH が解決できない。--blog で渡すか .env.local に置くこと',
        )
    }
    if (!existsSync(path)) {
        throw new Error(`BLOG_PATH が存在しない: ${path}`)
    }
    return path
}
