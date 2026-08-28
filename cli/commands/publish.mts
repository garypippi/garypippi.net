import { defineCommand } from 'citty'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { format, formatISO } from 'date-fns'
import { createId, readDrafts, serialize } from '../blog.mjs'
import { resolveBlogPath } from '../env.mjs'

/**
 * ドラフトを公開形式へ移す。
 *
 * 現在時刻は一度だけ取得し、日時ディレクトリ名とフロントマターの `date` の
 * 両方に使う。二度取ると秒をまたいだときに両者がずれる。
 *
 * `date-fns` の `format` は実行環境のローカルタイムゾーンで描画するので、
 * JST 以外の環境で叩くと日時ディレクトリがずれる。`TZ=Asia/Tokyo` を付ける。
 */
export const publishCommand = defineCommand({
    meta: {
        name: 'publish',
        description: 'ドラフトを公開形式へ移す',
    },
    args: {
        slug: {
            type: 'positional',
            required: true,
            description: '公開するドラフトのスラッグ',
        },
        blog: {
            type: 'string',
            description: 'BLOG_PATH の上書き',
        },
    },
    run({ args }) {
        const blog = resolveBlogPath(args.blog)
        const slug = args.slug.replace(/\.md$/, '')
        const draft = readDrafts(blog).find(entry => entry.id === slug)
        if (!draft) {
            throw new Error(`ドラフトが見つからない: ${slug}`)
        }
        if (!String(draft.attr.title ?? '').trim()) {
            throw new Error(`title が空: ${draft.path}`)
        }

        const now = new Date()
        const dir = join(blog, format(now, 'yyyyMMddHHmmss'))
        const id = createId()
        const path = join(dir, `${id}.md`)
        if (existsSync(path)) {
            throw new Error(`すでにある: ${path}`)
        }

        mkdirSync(dir, { recursive: true })
        writeFileSync(
            path,
            serialize({ ...draft.attr, date: formatISO(now) }, draft.body),
            'utf8',
        )
        rmSync(draft.path)

        process.stdout.write(`+ ${path}\n`)
        process.stdout.write(`- ${draft.path}\n`)
        process.stdout.write(`  /${id}\n`)
    },
})
