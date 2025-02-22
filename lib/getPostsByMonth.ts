import { format } from 'date-fns'
import { getPost } from './getPost'
import { getPostPaths } from './getPostPaths'

const yyyyMm = (date: string) => format(new Date(date), 'yyyy-MM')

/**
 * Get single post from created month
 */
export const getPostsByMonth = async (month: string) => {
    return getPostPaths()
        .then(paths => Promise.all(paths.map(path => getPost(path))))
        .then(posts =>
            posts.filter(({ attr: { date } }) => yyyyMm(date) === month),
        )
}
