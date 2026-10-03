import { randomBytes } from 'crypto'
import { readdirSync, readFileSync, statSync } from 'fs'
import { basename, join } from 'path'
import { parse } from 'smol-toml'

/**
 * 公開記事のパス。`<blog>/yyyyMMddHHmmss/<32桁hex>.md`
 *
 * レンダラー側 (`lib/getPostPaths.ts`) の絞り込みと同じ形。ここを変えるなら
 * 向こうも変える必要がある。
 */
const postPathRegExp = /[/\\]\d{14}[/\\][^/\\]+\.md$/

/**
 * フロントマターと本文の分割。`lib/getPost.ts` と同じ正規表現。
 */
const frontMatterRegExp = /^\+{3}\s([^]*?(?!\+{3}))\s\+{3}\s([^]*)$/

/**
 * ドラフトの置き場所。記事の絞り込み条件にマッチしないので、レンダラーからは
 * 構造的に見えない。blog リポは public なので git 管理下にも置かない。
 */
export const DRAFTS_DIR = '.drafts'

export type Attr = {
    title?: unknown
    date?: unknown
    tags?: unknown
    type?: unknown
    [key: string]: unknown
}

export type Entry = {
    /** 記事なら 32桁hex の ID、ドラフトならスラッグ */
    id: string
    path: string
    attr: Attr
    body: string
    draft: boolean
}

/**
 * 記事 ID。16バイトの乱数を 32桁hex にしたもの。
 */
export const createId = (): string => randomBytes(16).toString('hex')

export const splitFrontMatter = (
    text: string,
    path: string,
): { attr: Attr; body: string } => {
    const matched = frontMatterRegExp.exec(text)
    if (matched?.length !== 3) {
        throw new Error(`フロントマターを分割できない: ${path}`)
    }
    return { attr: parse(matched[1]) as Attr, body: matched[2] }
}

const escapeString = (value: string) =>
    value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

/**
 * `date` を TOML の offset datetime として出す。
 *
 * smol-toml は日付を `TomlDate` (Date のサブクラス) にして返すので、素朴に
 * `String()` すると `Mon Jan 01 2024 ...` という **TOML として不正な文字列**に
 * なる。`toISOString()` は smol-toml 側で上書きされていてオフセットを保つので
 * そちらを使う。ミリ秒は既存記事に無いので落とす。
 */
export const formatDate = (date: unknown): string =>
    date instanceof Date
        ? date.toISOString().replace(/\.\d{3}(?=[+\-Z])/, '')
        : String(date)

/**
 * フロントマターを組み立てる。
 *
 * smol-toml の `stringify` ではなく手書きなのは、キーの順序と `date` を
 * 引用符なしの offset datetime として出す形を固定したいため。既存記事の
 * 見た目に揃える。
 */
export const serialize = (attr: Attr, body: string): string => {
    const lines: string[] = ['+++']
    lines.push(`title = "${escapeString(String(attr.title ?? ''))}"`)
    if (attr.date) {
        lines.push(`date = ${formatDate(attr.date)}`)
    }
    const tags = Array.isArray(attr.tags) ? attr.tags : []
    lines.push(
        `tags = [${tags.map(tag => `"${escapeString(String(tag))}"`).join(', ')}]`,
    )
    if (attr.type) {
        lines.push(`type = "${escapeString(String(attr.type))}"`)
    }
    lines.push('+++')
    // 本文は一切加工しない。書き戻し時に無関係な差分が出るため
    return `${lines.join('\n')}\n${body}`
}

const walk = (dir: string): string[] => {
    const found: string[] = []
    for (const name of readdirSync(dir)) {
        const path = join(dir, name)
        if (statSync(path).isDirectory()) {
            found.push(...walk(path))
            continue
        }
        found.push(path)
    }
    return found
}

const read = (path: string, draft: boolean): Entry => {
    const { attr, body } = splitFrontMatter(readFileSync(path, 'utf8'), path)
    return { id: basename(path).replace(/\.md$/, ''), path, attr, body, draft }
}

/**
 * 公開記事を新しい順に返す。並び順はレンダラーと同じく日付ソートではなく
 * ディレクトリ名の辞書順の逆。
 */
export const readPosts = (blog: string): Entry[] =>
    walk(blog)
        .filter(path => postPathRegExp.test(path))
        .sort()
        .reverse()
        .map(path => read(path, false))

export const readDrafts = (blog: string): Entry[] => {
    const dir = join(blog, DRAFTS_DIR)
    try {
        return readdirSync(dir)
            .filter(name => name.endsWith('.md'))
            .sort()
            .map(name => read(join(dir, name), true))
    } catch {
        return []
    }
}
