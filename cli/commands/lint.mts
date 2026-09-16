import { defineCommand } from 'citty'
import { existsSync } from 'fs'
import { join } from 'path'
import { ASSETS_DIR, Entry, readDrafts, readPosts } from '../blog.mjs'
import { resolveBlogPath } from '../env.mjs'
import { findAssetUrls, findUnsupportedTypes } from '../markdown.mjs'

/**
 * フロントマターの既知キー。
 *
 * **未知キーは warning に留め、error にしない。** 厳格にすると、後から OGP の
 * 画像指定キーを足すときに「先に lint を直さないと既存記事が落ちる」という
 * 順序の縛りが生まれる。error にするのは必須キーの欠落と型の不一致だけ。
 */
const KNOWN_KEYS = new Set(['title', 'date', 'tags', 'type'])

const KNOWN_TYPES = new Set(['weekly'])

type Level = 'error' | 'warn'

type Problem = { level: Level; message: string }

const checkAttr = (entry: Entry): Problem[] => {
    const problems: Problem[] = []
    const { attr } = entry

    if (typeof attr.title !== 'string') {
        problems.push({ level: 'error', message: 'title が無いか文字列でない' })
    } else if (!attr.title.trim()) {
        problems.push({ level: 'warn', message: 'title が空' })
    }

    // ドラフトの date は publish が入れるので、無くてよい
    if (!entry.draft && !attr.date) {
        problems.push({ level: 'error', message: 'date が無い' })
    }

    if (!Array.isArray(attr.tags)) {
        problems.push({ level: 'error', message: 'tags が無いか配列でない' })
    } else {
        if (attr.tags.some(tag => typeof tag !== 'string')) {
            problems.push({ level: 'error', message: 'tags に文字列でない要素' })
        }
        if (attr.tags.length === 0) {
            problems.push({ level: 'warn', message: 'tags が空' })
        }
    }

    if (attr.type !== undefined && !KNOWN_TYPES.has(String(attr.type))) {
        problems.push({
            level: 'error',
            message: `未知の type: ${String(attr.type)}`,
        })
    }

    // 廃止済み。状態はファイルの置き場所だけで表す
    if (attr.draft !== undefined) {
        problems.push({
            level: 'error',
            message: 'draft は廃止済みなので消すこと',
        })
    }

    for (const key of Object.keys(attr)) {
        if (!KNOWN_KEYS.has(key) && key !== 'draft') {
            problems.push({ level: 'warn', message: `未知のキー: ${key}` })
        }
    }

    return problems
}

const checkBody = (entry: Entry, assets: string): Problem[] => {
    const problems: Problem[] = []

    for (const type of findUnsupportedTypes(entry.body)) {
        problems.push({
            level: 'error',
            message: `レンダラーが未対応のノード (ビルドが落ちる): ${type}`,
        })
    }

    for (const url of findAssetUrls(entry.body)) {
        // 別ホストを直接指しているものは検査のしようがないので飛ばす
        if (/^[a-z]+:\/\//i.test(url)) {
            continue
        }
        if (!existsSync(join(assets, url))) {
            problems.push({
                level: 'error',
                message: `アセットが無い: ${url}`,
            })
        }
    }

    return problems
}

/**
 * フロントマター / 未対応 Markdown ノード / アセットの実在を検査する。
 *
 * アセットの実在検査は手元のファイルを見るので、**ローカル専用のコマンド**として扱うこと。
 */
export const lintCommand = defineCommand({
    meta: {
        name: 'lint',
        description: 'フロントマターと本文を検査する',
    },
    args: {
        assets: {
            type: 'string',
            description: `アセットの置き場所 (既定は <blog>/${ASSETS_DIR})`,
        },
        blog: {
            type: 'string',
            description: 'BLOG_PATH の上書き',
        },
    },
    run({ args }) {
        const blog = resolveBlogPath(args.blog)
        const assets = args.assets || join(blog, ASSETS_DIR)
        const entries = [...readDrafts(blog), ...readPosts(blog)]

        let errors = 0
        let warnings = 0

        for (const entry of entries) {
            const problems = [
                ...checkAttr(entry),
                ...checkBody(entry, assets),
            ]
            for (const problem of problems) {
                if (problem.level === 'error') {
                    errors++
                } else {
                    warnings++
                }
                process.stdout.write(
                    `${entry.path}: ${problem.level}: ${problem.message}\n`,
                )
            }
        }

        process.stdout.write(
            `${entries.length} 件を検査、error ${errors} / warn ${warnings}\n`,
        )
        if (errors > 0) {
            process.exitCode = 1
        }
    },
})
