import { defineCommand } from 'citty'
import { Entry, formatDate, readDrafts, readPosts } from '../blog.mjs'
import { resolveBlogPath } from '../env.mjs'

const toRecord = (entry: Entry) => ({
    id: entry.id,
    href: entry.draft ? null : `/${entry.id}`,
    path: entry.path,
    title: String(entry.attr.title ?? ''),
    date: entry.attr.date ? formatDate(entry.attr.date) : null,
    tags: Array.isArray(entry.attr.tags) ? entry.attr.tags.map(String) : [],
    type: entry.attr.type ? String(entry.attr.type) : null,
    draft: entry.draft,
})

/**
 * 一覧を出す。`--json` は選択 UI や TUI から食わせるための機械可読出力。
 */
export const listCommand = defineCommand({
    meta: {
        name: 'list',
        description: '記事とドラフトの一覧',
    },
    args: {
        json: {
            type: 'boolean',
            description: '機械可読な JSON で出す',
        },
        drafts: {
            type: 'boolean',
            description: 'ドラフトだけを出す',
        },
        weekly: {
            type: 'boolean',
            description: '週報だけを出す',
        },
        blog: {
            type: 'string',
            description: 'BLOG_PATH の上書き',
        },
    },
    run({ args }) {
        const blog = resolveBlogPath(args.blog)
        const entries = (
            args.drafts ? readDrafts(blog) : [
                ...readDrafts(blog),
                ...readPosts(blog),
            ]
        ).filter(entry => !args.weekly || entry.attr.type === 'weekly')

        if (args.json) {
            process.stdout.write(
                `${JSON.stringify(entries.map(toRecord), null, 2)}\n`,
            )
            return
        }

        for (const entry of entries) {
            const record = toRecord(entry)
            const mark = record.draft ? 'draft' : (record.date ?? '').slice(0, 10)
            const type = record.type ? ` [${record.type}]` : ''
            const tags = record.tags.length ? ` (${record.tags.join(', ')})` : ''
            process.stdout.write(
                `${mark.padEnd(10)} ${record.id}${type} ${record.title}${tags}\n`,
            )
        }
    },
})
