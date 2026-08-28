import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parse } from 'smol-toml'
import { formatDate, serialize, splitFrontMatter } from '../dist/blog.mjs'

/**
 * CLI のテストは jest ではなく node:test で回す。
 *
 * jest 側は jsdom 環境で、`.mts` の `.mjs` 付き import 指定子を解決するには
 * moduleResolution の作り替えが要る。CLI は素の Node で動く成果物なので、
 * コンパイル済みの `cli/dist` を標準のテストランナーで直に検証する方が近い。
 */

test('TomlDate をそのまま文字列化すると TOML が壊れる', () => {
    const { date } = parse('date = 2024-01-01T00:00:00+09:00')

    // 素朴な String() は "Mon Jan 01 2024 ..." になる (これを踏むと記事が壊れる)
    assert.match(String(date), /^Mon Jan/)
    assert.equal(formatDate(date), '2024-01-01T00:00:00+09:00')
})

test('日付を持つ記事を書き戻しても date 行が変わらない', () => {
    const original = [
        '+++',
        'title = "タイトル"',
        'date = 2024-01-01T00:00:00+09:00',
        'tags = ["a"]',
        '+++',
        '',
        '本文',
        '',
    ].join('\n')

    const { attr, body } = splitFrontMatter(original, 'test.md')

    assert.equal(serialize(attr, body), original)
})

test('本文を加工しない (先頭の空行を保つ)', () => {
    const { attr, body } = splitFrontMatter(
        '+++\ntitle = ""\ntags = []\n+++\n\n本文\n',
        'test.md',
    )

    assert.equal(serialize(attr, body), '+++\ntitle = ""\ntags = []\n+++\n\n本文\n')
})

test('type を持つときだけ type 行を出す', () => {
    assert.match(
        serialize({ title: 'a', tags: [], type: 'weekly' }, '\n'),
        /^type = "weekly"$/m,
    )
    assert.doesNotMatch(serialize({ title: 'a', tags: [] }, '\n'), /^type/m)
})

test('引用符とバックスラッシュをエスケープする', () => {
    const text = serialize({ title: 'a"b\\c', tags: ['x"y'] }, '\n')

    assert.match(text, /title = "a\\"b\\\\c"/)
    // 生成したものを読み直せる (壊れた TOML を書いていない)
    assert.equal(splitFrontMatter(text, 'test.md').attr.title, 'a"b\\c')
})
