import { renderToStaticMarkup } from 'react-dom/server'
import { getMdast } from '@lib/getMdast'
import { Post } from '@lib/components/Post'

const renderMarkdown = (body: string) =>
    renderToStaticMarkup(<Post node={getMdast(body)} />)

// tableRow / tableCell は Post の switch を通らず Table が直接描く。
// 行の位置という文脈が必要なため (th/td の出し分けと align)
describe('Table', () => {
    const table = '| a | b |\n| :- | -: |\n| 1 | 2 |\n| 3 | 4 |\n'

    it('先頭行だけを thead の th にする', () => {
        const html = renderMarkdown(table)

        expect(html).toContain('<thead>')
        expect(html).toContain('<tbody>')
        expect((html.match(/<th[ >]/g) ?? []).length).toBe(2)
        expect((html.match(/<td[ >]/g) ?? []).length).toBe(4)
    })

    it('align をセルに反映する', () => {
        const html = renderMarkdown(table)

        expect(html).toContain('left')
        expect(html).toContain('right')
    })

    it('セルの中身は Post に戻って描かれる', () => {
        const html = renderMarkdown('| a |\n| - |\n| `x` |\n')

        expect(html).toContain('<code')
    })
})

describe('Text (budoux)', () => {
    it('日本語の文節境界に wbr を入れる', () => {
        const html = renderMarkdown('今日は良い天気ですね')

        expect(html).toContain('<wbr/>')
    })

    it('短い語には wbr を入れない', () => {
        expect(renderMarkdown('あ')).not.toContain('<wbr')
    })

    it('段落内の改行を br にする', () => {
        // Markdown の hard break ではなく text ノード内の \n を見ている
        const html = renderMarkdown('いち\nに\n')

        expect((html.match(/<br/g) ?? []).length).toBe(1)
    })
})

describe('Code', () => {
    it('言語指定があればその言語でハイライトする', () => {
        const html = renderMarkdown('```js\nconst a = 1\n```\n')

        expect(html).toContain('hljs')
        expect(html).toContain('hljs-keyword')
    })

    it('言語指定が無ければ bash にフォールバックする', () => {
        // bash として解釈されれば echo が組み込みコマンドとして色付く
        const html = renderMarkdown('```\necho hi\n```\n')

        expect(html).toContain('hljs-built_in')
    })

    it('ハイライト済みHTMLをエスケープせずに挿す', () => {
        const html = renderMarkdown('```js\nconst a = 1\n```\n')

        expect(html).toContain('<span')
    })
})

describe('Link', () => {
    it('href をそのまま使う (前置しない)', () => {
        const html = renderMarkdown('[ラベル](https://example.com/x)')

        expect(html).toContain('href="https://example.com/x"')
        expect(html).toContain('ラベル')
    })
})
