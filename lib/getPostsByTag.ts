import { getPost } from './getPost'
import { getPostPaths } from './getPostPaths'

/**
 * Get single post from tag name
 */
export const getPostsByTag = async (tag: string) => {
    return getPostPaths()
        .then(paths => Promise.all(paths.map(path => getPost(path))))
        .then(posts => posts.filter(({ attr }) => attr.tags.includes(tag)))
}
