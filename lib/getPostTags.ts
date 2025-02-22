import { getPost } from '@lib/getPost'
import { getPostPaths } from '@lib/getPostPaths'

/**
 * Get all tags
 */
export const getPostTags = async () => {
    return getPostPaths().then(async paths =>
        Promise.all(paths.map(path => getPost(path))).then(posts =>
            Array.from(new Set(posts.map(({ attr }) => attr.tags).flat())),
        ),
    )
}
