import { readdir } from 'fs'
import { encoding } from '../encoding'

export const getPaths = async (dir: string): Promise<string[]> => {
    // returns promise
    return new Promise(res => {
        // recurse
        readdir(dir, { encoding }, (err, paths) => {
            // quit working if err exists
            if (err) {
                return res([dir])
            }
            // prepare promise
            const resolvesToTree = paths
                .filter(path => !/^\..+$/.test(`${path}`)) // exclude '..' entry
                .map(path => getPaths(`${dir}/${path}`))   // recurse
            // yields string[][] so we flatten it
            const resolvesToPaths = Promise.all(resolvesToTree)
                // flatten
                .then(tree => {
                    return tree
                        .reduce((a, paths) => a.concat(paths), []) // flatten
                        .reverse()                                 // order
                })
            // resolve
            res(resolvesToPaths)
        })
    })
}
