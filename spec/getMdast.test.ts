import { getMdast } from '@lib/getMdast'

const types = (body: string) => getMdast(body).children.map(node => node.type)

describe('getMdast', () => {
    it('本文をブロック単位の mdast にする', () => {
        expect(types('# 見出し\n\n段落\n\n```js\n1\n```\n')).toEqual([
            'heading',
            'paragraph',
            'code',
        ])
    })

    it('GFM のテーブルを有効にしている', () => {
        const root = getMdast('| a | b |\n| - | - |\n| 1 | 2 |\n')

        expect(root.children[0].type).toBe('table')
    })

    it('テーブルの align を保持する', () => {
        const [table] = getMdast('| a | b |\n| :- | -: |\n| 1 | 2 |\n').children

        expect(table.type === 'table' && table.align).toEqual(['left', 'right'])
    })

    // テーブル以外の GFM は意図的に入れていない。
    // 有効化するとこのテストが落ちるので、そのときは記法の対応も一緒に考えること
    it('取り消し線は GFM として解釈しない', () => {
        const root = getMdast('~~消し~~\n')
        const [paragraph] = root.children

        expect(paragraph.type === 'paragraph' && paragraph.children).toEqual([
            { type: 'text', value: '~~消し~~', position: expect.anything() },
        ])
    })

    it('autolink literal を解釈しない', () => {
        const root = getMdast('https://example.com\n')
        const [paragraph] = root.children
        const kinds =
            paragraph.type === 'paragraph'
                ? paragraph.children.map(child => child.type)
                : []

        expect(kinds).toEqual(['text'])
    })
})
