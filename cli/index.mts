import { defineCommand, runMain } from 'citty'
import { newCommand } from './commands/new.mjs'
import { publishCommand } from './commands/publish.mjs'
import { listCommand } from './commands/list.mjs'
import { lintCommand } from './commands/lint.mjs'
import { tagsCommand } from './commands/tags.mjs'

/**
 * blog リポジトリの記事を扱う CLI。
 *
 * 記事フォーマット (TOML フロントマター、日時ディレクトリ、32桁hex の ID) の
 * 知識はレンダラーであるこのリポジトリ側にあるので、CLI もここに置いている。
 */
const main = defineCommand({
    meta: {
        name: 'blog',
        description: 'garypippi.net の記事を扱う',
    },
    subCommands: {
        new: newCommand,
        publish: publishCommand,
        list: listCommand,
        lint: lintCommand,
        tags: tagsCommand,
    },
})

runMain(main)
