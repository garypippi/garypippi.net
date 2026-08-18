import { basename } from 'path'
import { MetadataRoute } from 'next'
import { HOST_URL } from '@lib/environments'
import { getPostPaths } from '@lib/getPostPaths'

// sitemap.ts は Route Handler にコンパイルされるため、output: 'export' では
// force-static の明示が必須 (無いとビルドが落ちる)
export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    if (!HOST_URL) {
        throw new Error('Please provide HOST_URL environment variable')
    }

    const paths = await getPostPaths()

    return [
        { url: `${HOST_URL}/` },
        ...paths.map(path => ({
            url: `${HOST_URL}/${basename(path).replace(/\.md$/, '')}`,
        })),
    ]
}
