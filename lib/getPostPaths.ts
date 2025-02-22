import { readdir } from 'fs'
import { BLOG_PATH } from './environments'

/**
 * File name is random 14 characters
 */
const blogFileRegExp = /\/\d{14}\/.+\.md$/

/**
 * Get all blog paths
 */
export const getPostPaths = async (
    dir: string = BLOG_PATH,
): Promise<string[]> =>
    new Promise(resolve => {
        readdir(dir, { encoding: 'utf8' }, (err, paths) => {
            resolve(
                err
                    ? [dir]
                    : Promise.all(
                          paths.map(path =>
                              getPostPaths(`${dir}/${path}`).then(
                                  paths => paths,
                              ),
                          ),
                      ).then(tree =>
                          tree
                              .flat()
                              .filter(path => blogFileRegExp.test(path))
                              .reverse(),
                      ),
            )
        })
    })
