import { renderToStaticMarkup } from 'react-dom/server'
import { Root, RootContent } from 'mdast'
import { getMdast } from '@lib/getMdast'
import { Post } from '@lib/components/Post'

const render = (node: Root | RootContent) =>
    renderToStaticMarkup(<Post node={node} />)

const renderMarkdown = (body: string) => render(getMdast(body))

describe('Post の画像・動画の出し分け', () => {
    it.each(['clip.mp4', 'clip.webm', 'clip.mov', 'CLIP.MP4', 'clip.MoV'])(
        '%s は <video> になる',
        url => {
            const html = renderMarkdown(`![clip](${url})`)

            expect(html).toContain('<video')
            expect(html).toContain(`src="https://video.example.com/${url}"`)
            expect(html).not.toContain('<img')
        },
    )

    it.each(['photo.jpg', 'photo.png', 'photo.gif', 'photo.mp4.jpg'])(
        '%s は <img> になる',
        url => {
            const html = renderMarkdown(`![photo](${url})`)

            expect(html).toContain('<img')
            expect(html).toContain(`src="https://img.example.com/${url}"`)
            expect(html).not.toContain('<video')
        },
    )

    it('alt を img に渡す', () => {
        expect(renderMarkdown('![説明](a.png)')).toContain('alt="説明"')
    })

    it('alt が無ければ空文字を入れる', () => {
        expect(renderMarkdown('![](a.png)')).toContain('alt=""')
    })

    // `!` を付けなければ動画ファイルへのリンクも書ける
    it('リンク記法の .mp4 は <a> のまま', () => {
        const html = renderMarkdown('[これ](clip.mp4)')

        expect(html).toContain('<a href="clip.mp4"')
        expect(html).not.toContain('<video')
    })
})

describe('Post の未対応ノード', () => {
    // 落とさずに落とす (握り潰すと記事の内容が黙って消えるため)
    it.each([
        ['strong', '**太字**'],
        ['emphasis', '*斜体*'],
        ['thematicBreak', '---\n'],
    ])('%s はビルドを落とす', (type, body) => {
        expect(() => renderMarkdown(body)).toThrow(
            `Not something we can render: ${type}`,
        )
    })
})

describe('Post のブロック要素', () => {
    it('見出しの深さを反映する', () => {
        expect(renderMarkdown('## 見出し')).toContain('<h2')
        expect(renderMarkdown('#### 見出し')).toContain('<h4')
    })

    it('リストを ul/li にする', () => {
        const html = renderMarkdown('- a\n- b\n')

        expect(html).toContain('<ul')
        expect((html.match(/<li/g) ?? []).length).toBe(2)
    })

    it('引用を blockquote にする', () => {
        expect(renderMarkdown('> 引用\n')).toContain('<blockquote')
    })

    it('インラインコードを code にする', () => {
        expect(renderMarkdown('`x`')).toContain('<code')
    })
})
