import { basename } from 'path'
import { MetadataRoute } from 'next'
import { HOST_URL } from '@lib/environments'
import { getPostPaths } from '@lib/getPostPaths'
import { getPageCount, getPageHref } from '@lib/getPostsByPage'

// sitemap.ts は Route Handler にコンパイルされるため、output: 'export' では
// force-static の明示が必須 (無いとビルドが落ちる)
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (!HOST_URL) {
        throw new Error('Please provide HOST_URL environment variable')
    }

    const paths = await getPostPaths()
    const pageCount = await getPageCount()

    return [
        // 一覧のページ (1ページ目は `/`)
        ...Array.from({ length: pageCount }, (_, i) => ({
            url: `${HOST_URL}${getPageHref(i + 1)}`,
        })),
        ...paths.map(path => ({
            url: `${HOST_URL}/${basename(path).replace(/\.md$/, '')}`,
        })),
    ]
}
