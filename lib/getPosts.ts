import { getPost } from './getPost'
import { getPostPaths } from './getPostPaths'

/**
 * Get all posts
 */
export const getPosts = async () => {
    return getPostPaths().then(paths =>
        Promise.all(paths.map(path => getPost(path))),
    )
}
