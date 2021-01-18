import { join } from 'path'
import { mkdir, writeFile } from 'fs'
import { randomBytes } from 'crypto'
import { DateTime } from 'luxon'

const fm = (date: string) => `+++
title = ""
date = ${date}
tags = []
+++
`

export const run = async (root: string) => {
    const dt = DateTime.local()
    const dir = dt.toFormat('yyyyLLddHHmmss')
    const id = randomBytes(16).toString('hex')
    const md = fm(dt.toUTC().toISO())
    const path = join(root, dir, `${id}.md`)
    mkdir(join(root, dir), () => {
        writeFile(path, md, {}, (err) => {
            if (err)
                throw err
            process.stdout.write(
                `+ ${path}\n`
            )
        })
    })
}
