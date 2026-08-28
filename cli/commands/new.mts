import { defineCommand } from 'citty'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { DRAFTS_DIR, serialize } from '../blog.mjs'
import { resolveBlogPath } from '../env.mjs'

/**
 * ドラフトを作る。
 *
 * 日時ディレクトリはここでは作らない。執筆開始から公開までの間に日時がずれ、
 * ディレクトリ名は一覧の並び順を決めるソートキーでもあるため、日時の確定は
 * `publish` に寄せている。
 */
export const newCommand = defineCommand({
    meta: {
        name: 'new',
        description: 'ドラフトを作る',
    },
    args: {
        slug: {
            type: 'positional',
            required: true,
            description: 'ドラフトのファイル名 (人間が読めるスラッグ)',
        },
        title: {
            type: 'string',
            description: '記事のタイトル',
        },
        weekly: {
            type: 'boolean',
            description: '週報として作る (type = "weekly")',
        },
        blog: {
            type: 'string',
            description: 'BLOG_PATH の上書き',
        },
    },
    run({ args }) {
        const blog = resolveBlogPath(args.blog)
        const dir = join(blog, DRAFTS_DIR)
        const path = join(dir, `${args.slug.replace(/\.md$/, '')}.md`)
        if (existsSync(path)) {
            throw new Error(`すでにある: ${path}`)
        }
        mkdirSync(dir, { recursive: true })
        writeFileSync(
            path,
            serialize(
                {
                    title: args.title ?? '',
                    tags: [],
                    ...(args.weekly ? { type: 'weekly' } : {}),
                },
                '\n',
            ),
            'utf8',
        )
        process.stdout.write(`+ ${path}\n`)
    },
})
