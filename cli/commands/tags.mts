import { defineCommand } from 'citty'
import { writeFileSync } from 'fs'
import { Entry, readDrafts, readPosts, serialize } from '../blog.mjs'
import { resolveBlogPath } from '../env.mjs'

const tagsOf = (entry: Entry): string[] =>
    Array.isArray(entry.attr.tags) ? entry.attr.tags.map(String) : []

/**
 * タグの一覧と一括リネーム。
 *
 * タグページは `/tags/<tag>` として個別に生成されるので、表記の揺れがそのまま
 * 別ページになる。揃えるための口。
 */
export const tagsCommand = defineCommand({
    meta: {
        name: 'tags',
        description: 'タグの一覧と一括リネーム',
    },
    args: {
        rename: {
            type: 'string',
            description: 'リネーム元のタグ (--to と併用)',
        },
        to: {
            type: 'string',
            description: 'リネーム先のタグ',
        },
        json: {
            type: 'boolean',
            description: '機械可読な JSON で出す',
        },
        blog: {
            type: 'string',
            description: 'BLOG_PATH の上書き',
        },
    },
    run({ args }) {
        const blog = resolveBlogPath(args.blog)
        const entries = [...readDrafts(blog), ...readPosts(blog)]

        if (args.rename) {
            if (!args.to) {
                throw new Error('--rename には --to が要る')
            }
            let changed = 0
            for (const entry of entries) {
                const tags = tagsOf(entry)
                if (!tags.includes(args.rename)) {
                    continue
                }
                // リネーム先が既にあると重複するので、まとめて畳む
                const renamed = [
                    ...new Set(
                        tags.map(tag => (tag === args.rename ? args.to : tag)),
                    ),
                ]
                writeFileSync(
                    entry.path,
                    serialize({ ...entry.attr, tags: renamed }, entry.body),
                    'utf8',
                )
                process.stdout.write(`~ ${entry.path}\n`)
                changed++
            }
            process.stdout.write(
                `${args.rename} -> ${args.to}: ${changed} 件を書き換えた\n`,
            )
            return
        }

        const counts = new Map<string, number>()
        for (const entry of entries) {
            for (const tag of tagsOf(entry)) {
                counts.set(tag, (counts.get(tag) ?? 0) + 1)
            }
        }
        const sorted = [...counts].sort(
            (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
        )

        if (args.json) {
            process.stdout.write(
                `${JSON.stringify(
                    sorted.map(([tag, count]) => ({ tag, count })),
                    null,
                    2,
                )}\n`,
            )
            return
        }

        for (const [tag, count] of sorted) {
            process.stdout.write(`${String(count).padStart(4)}  ${tag}\n`)
        }
    },
})
