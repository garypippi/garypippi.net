import { getPostExcerpt } from '@lib/getPostExcerpt'

describe('getPostExcerpt', () => {
    it('段落のテキストを拾う', () => {
        expect(getPostExcerpt('こんにちは')).toBe('こんにちは')
    })

    it('段落の境界に空白を入れる (連結してしまわない)', () => {
        expect(getPostExcerpt('いち\n\nに')).toBe('いち に')
    })

    it('見出しも拾う', () => {
        expect(getPostExcerpt('# 見出し\n\n本文')).toBe('見出し 本文')
    })

    it('リストの項目を分けて拾う', () => {
        expect(getPostExcerpt('- a\n- b\n')).toBe('a b')
    })

    it('インラインコードは拾う', () => {
        expect(getPostExcerpt('`npm test` を実行')).toBe('npm test を実行')
    })

    // 抜粋としては意味をなさないので飛ばす
    it('コードブロックは飛ばす', () => {
        expect(getPostExcerpt('```js\nconst a = 1\n```\n\n説明')).toBe('説明')
    })

    it('画像の alt は拾わない', () => {
        expect(getPostExcerpt('![説明](a.png)\n\n本文')).toBe('本文')
    })

    it('本文がコードブロックだけなら空になる', () => {
        expect(getPostExcerpt('```c\nint main(){}\n```\n')).toBe('')
    })

    it('リンクのラベルは拾う', () => {
        expect(getPostExcerpt('[ラベル](https://example.com)')).toBe('ラベル')
    })

    it('200字を超えたら切って … を付ける', () => {
        const excerpt = getPostExcerpt('あ'.repeat(300))

        expect(excerpt).toHaveLength(201)
        expect(excerpt.endsWith('…')).toBe(true)
    })

    it('ちょうど200字なら切らない', () => {
        const excerpt = getPostExcerpt('あ'.repeat(200))

        expect(excerpt).toHaveLength(200)
        expect(excerpt.endsWith('…')).toBe(false)
    })

    it('前後の空白を落とす', () => {
        expect(getPostExcerpt('\n\n  本文  \n\n')).toBe('本文')
    })
})
