import { format } from 'date-fns'
import { HOST_URL, SITE_TITLE } from '@lib/environments'
import { getPosts } from '@lib/getPosts'
import { getPostExcerpt } from '@lib/getPostExcerpt'

// sitemap.ts / robots.ts と同じく output: 'export' では force-static が必須
export const dynamic = 'force-static'

const escapeXml = (value: string) =>
    value.replace(
        /[&<>"']/g,
        c =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&apos;',
            })[c] as string,
    )

/**
 * RSS 2.0 の pubDate は RFC822 形式。ロケール依存を避けるため曜日と月は
 * date-fns の既定 (en-US) のまま使う
 */
const rfc822 = (date: Date) => format(date, 'EEE, dd MMM yyyy HH:mm:ss xx')

export async function GET() {
    if (!HOST_URL) {
        throw new Error('Please provide HOST_URL environment variable')
    }

    const posts = await getPosts()

    const items = posts.map(({ href, attr: { title, date, tags }, body }) => {
        const link = `${HOST_URL}${href}`
        // 本文がコードブロックだけの記事は抜粋が空になる。空要素を出すより省く
        const excerpt = getPostExcerpt(body)
        return [
            '<item>',
            `  <title>${escapeXml(title)}</title>`,
            `  <link>${escapeXml(link)}</link>`,
            `  <guid isPermaLink="true">${escapeXml(link)}</guid>`,
            `  <pubDate>${rfc822(new Date(date))}</pubDate>`,
            ...tags.map(tag => `  <category>${escapeXml(tag)}</category>`),
            ...(excerpt
                ? [`  <description>${escapeXml(excerpt)}</description>`]
                : []),
            '</item>',
        ].join('\n')
    })

    // ビルドのたびに変わる値を入れると差分が出続けるので、最新記事の日付を使う
    const lastBuildDate = posts.length
        ? rfc822(new Date(posts[0].attr.date))
        : rfc822(new Date(0))

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        '<channel>',
        `  <title>${escapeXml(SITE_TITLE)}</title>`,
        `  <link>${escapeXml(HOST_URL)}/</link>`,
        `  <description>${escapeXml(SITE_TITLE)}</description>`,
        '  <language>ja</language>',
        `  <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
        `  <atom:link href="${escapeXml(HOST_URL)}/feed.xml" rel="self" type="application/rss+xml"/>`,
        ...items,
        '</channel>',
        '</rss>',
    ].join('\n')

    return new Response(xml, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    })
}
