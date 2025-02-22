import { basename } from 'path'
import { getPost } from './getPost'
import { getPostPaths } from './getPostPaths'

/**
 * Get single post by id
 * throw error if no post found
 */
export const getPostById = async (id: string) => {
    const path = await getPostPaths().then(paths =>
        paths.find(path => basename(path).replace(/\.md$/, '') === id),
    )
    if (typeof path === 'undefined') {
        throw new Error(`Post not found for ${id}`)
    }

    return getPost(path)
}
