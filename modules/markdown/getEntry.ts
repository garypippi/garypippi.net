import { basename } from 'path'
import { readFile } from 'fs'
import { encoding } from '../encoding'
import { Entry } from './types'
import { formatISO } from 'date-fns'
import { exec } from 'child_process'
import toml from 'toml'
import { BLOG_PATH } from 'modules/env'

const re = /^\+{3}\s([^]*?(?!\+{3}))\s\+{3}\s([^]*)$/

export const getEntry = async (path: string, hash?: string): Promise<Entry> => {
    // read file
    return new Promise(res => {
        // read file and create Entry object
        const callback = (buf: string) => {
            // split front matter and content
            const regExpResultArray = re.exec(buf)
            // split failure
            if (null === regExpResultArray) {
                throw new Error(`Failed to split front matter and content. path: ${path}`)
            }
            // parse toml
            const attr = toml.parse(regExpResultArray[1])
            // create relative link
            const href = '/' + basename(path).replace(/\.md$/, '')
            // convert date to iso
            attr.date = formatISO(new Date(attr.date))
            // resolves to Entry object
            res({
                href,
                attr,
                body: regExpResultArray[2]
            })
        }
        if (hash) {
            exec(`cd ${BLOG_PATH} && git show ${hash}:${path.replace(BLOG_PATH + '/', '')}`, (err, buf) => {
                if (err) {
                    throw err
                }
                callback(buf)
            })
        } else {
            readFile(path, { encoding }, (err, buf) => {
                // went something wrong
                if (err) {
                    throw err
                }
                callback(buf)
            })
        }
    })
}
