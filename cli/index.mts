import cli from 'commander'
import * as cmd from './cmds/index.mjs'
import { join } from 'path'
import { randomBytes } from 'crypto'
import { mkdir, writeFile } from 'fs'
import { format, formatISO } from 'date-fns'

// encoding
const encoding = 'utf8'

// add new blog post
cli.command('add <dir>')
    .action((root: string) => {
        // current time
        const dt = new Date
        // determine unique id
        const id = randomBytes(16).toString('hex')
        // determine content
        const md = `+++\ntitle = ""\ndate = ${formatISO(dt)}\ntags = []\n+++\n`
        // determine directory
        const dir = join(root, format(dt, 'yyyyMMddHHmmss'))
        // determine file
        const file = join(dir, `${id}.md`)
        // make directory
        mkdir(dir, (err) => {
            if (err) {
                throw new Error(`Failed to create directory: ${dir}`)
            }
            writeFile(file, md, { encoding }, err => {
                if (err) {
                    throw new Error(`Failed to create file: ${file}`)
                }
                process.stdout.write(`+ ${file}\n`)
            })
        })
    })

cli.command('sitemap')
    .action(cmd.sitemap)

// parse arguments and run
cli.parse(process.argv)
