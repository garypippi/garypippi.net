import { basename } from 'path'
import { readFile } from 'fs'
import { parse } from 'smol-toml'

/**
 * Post definition
 */
export type Post = {
    href: string
    body: string
    attr: {
        title: string
        date: string
        tags: string[]
        draft?: true
    }
}

/**
 * Get post from blog file path
 */
export const getPost = async (path: string): Promise<Post> =>
    new Promise(resolve => {
        readFile(path, { encoding: 'utf8' }, (err, buf) => {
            if (err) {
                throw err
            }
            const regExpResultArray =
                /^\+{3}\s([^]*?(?!\+{3}))\s\+{3}\s([^]*)$/.exec(buf)
            if (regExpResultArray?.length !== 3) {
                throw new Error(
                    `Failed to split front matter and content. path: ${path}`,
                )
            }
            resolve({
                href: '/' + basename(path).replace(/\.md$/, ''),
                attr: parse(regExpResultArray[1]) as Post['attr'],
                body: regExpResultArray[2],
            })
        })
    })
