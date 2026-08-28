import { Nodes } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table'

/**
 * レンダラーが描ける mdast のノード型。
 *
 * **`lib/components/Post/index.tsx` の switch と対になっている。** 向こうに
 * `case` を足したらここにも足すこと。lint はこの一覧に無い型を「ビルドを
 * 落とす記法」として報告する。
 *
 * `tableRow` / `tableCell` は switch を通らないが、`Table` が描くので対応済み
 * として数える。
 */
export const SUPPORTED_NODE_TYPES = new Set([
    'root',
    'paragraph',
    'text',
    'list',
    'listItem',
    'image',
    'heading',
    'code',
    'link',
    'inlineCode',
    'blockquote',
    'table',
    'tableRow',
    'tableCell',
])

/**
 * `lib/getMdast.ts` と同じ設定。GFM はテーブルのみ。
 */
export const getMdast = (body: string) =>
    fromMarkdown(body, {
        extensions: [gfmTable()],
        mdastExtensions: [gfmTableFromMarkdown()],
    })

const walk = (node: Nodes, visit: (node: Nodes) => void): void => {
    visit(node)
    if ('children' in node) {
        for (const child of node.children) {
            walk(child, visit)
        }
    }
}

/**
 * レンダラーが投げる未対応ノードの型を、本文中に出てくる順で返す。
 */
export const findUnsupportedTypes = (body: string): string[] => {
    const found: string[] = []
    walk(getMdast(body), node => {
        if (!SUPPORTED_NODE_TYPES.has(node.type) && !found.includes(node.type)) {
            found.push(node.type)
        }
    })
    return found
}

/**
 * 画像記法で参照しているファイル名を返す。動画も画像記法で書くので同じ経路。
 */
export const findAssetUrls = (body: string): string[] => {
    const found: string[] = []
    walk(getMdast(body), node => {
        if (node.type === 'image' && !found.includes(node.url)) {
            found.push(node.url)
        }
    })
    return found
}
