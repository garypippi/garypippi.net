import { format } from 'date-fns'
import { getPost } from '@lib/getPost'
import { getPostPaths } from '@lib/getPostPaths'

/**
 * Get all months with post count
 */
export const getPostMonths = async () => {
    return getPostPaths().then(async paths =>
        Promise.all(paths.map(path => getPost(path))).then(posts =>
            posts.reduce<{ [month: string]: number }>(
                (a, { attr: { date } }) => ({
                    ...a,
                    [format(new Date(date), 'yyyy-MM')]:
                        (a[format(new Date(date), 'yyyy-MM')] ?? 0) + 1,
                }),
                {},
            ),
        ),
    )
}
