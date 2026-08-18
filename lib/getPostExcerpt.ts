import { Nodes } from 'mdast'
import { getMdast } from './getMdast'

/**
 * 抜粋の最大文字数
 */
const MAX_LENGTH = 200

/**
 * ブロック要素の境界には空白を入れないと段落が繋がってしまう
 */
const blockTypes = new Set([
    'paragraph',
    'heading',
    'listItem',
    'blockquote',
    'tableCell',
])

const toText = (node: Nodes): string => {
    switch (node.type) {
        // コードブロックと画像は抜粋として意味をなさないので飛ばす
        case 'code':
        case 'image':
        case 'html':
            return ''
        case 'text':
        case 'inlineCode':
            return node.value
        default: {
            if (!('children' in node)) {
                return ''
            }
            const text = node.children.map(toText).join('')
            return blockTypes.has(node.type) ? `${text} ` : text
        }
    }
}

/**
 * 本文の先頭からプレーンテキストの抜粋を作る
 */
export const getPostExcerpt = (body: string): string => {
    const text = toText(getMdast(body)).replace(/\s+/g, ' ').trim()
    return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH)}…` : text
}
