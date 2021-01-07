import * as fs from 'fs'
import { promisify } from 'util'

const readdir = promisify(fs.readdir)

export const ls = async (dir: string): Promise<string[]> => {
    return readdir(dir)
        .then(paths => paths.filter(path => ! /^\..+$/.test(path)))
        .then(paths => paths.map(path => ls(`${dir}/${path}`)))
        .then(calls => Promise.all(calls))
        .then(paths => paths.reduce((_, paths) => _.concat(paths), []))
        .then(paths => paths.reverse())
        .catch(() => [dir])
}
