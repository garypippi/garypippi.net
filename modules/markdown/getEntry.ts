import { basename } from 'path'
import { readFile } from 'fs'
import { encoding } from '../encoding'
import { Entry } from './types'
import { formatISO } from 'date-fns'
import toml from 'toml'

const re = /^\+{3}\s([^]*?(?!\+{3}))\s\+{3}\s([^]*)$/

export const getEntry = async (path: string): Promise<Entry> => {
    // read file
    return new Promise(res => {
        // read file and create Entry object
        readFile(path, { encoding }, (err, buf) => {
            // went something wrong
            if (err) {
                throw err
            }
            // split front matter and content
            const regExpResultArray = re.exec(buf)
            // split failure
            if (null === regExpResultArray) {
                throw new Error(`Failed to split front matter and content. path: ${path}`)
            }
            // parse toml
            const attr = toml.parse(regExpResultArray[1])
            // create relative link
            const href = basename(path).replace(/\.md$/, '')
            // convert date to iso
            attr.date = formatISO(new Date(attr.date))
            // resolves to Entry object
            res({
                href,
                attr,
                body: regExpResultArray[2]
            })
        })
    })
}
