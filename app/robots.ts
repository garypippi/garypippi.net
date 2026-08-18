import { MetadataRoute } from 'next'
import { HOST_URL } from '@lib/environments'

// robots.ts も sitemap.ts と同じく Route Handler にコンパイルされるため、
// output: 'export' では force-static の明示が必須
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    if (!HOST_URL) {
        throw new Error('Please provide HOST_URL environment variable')
    }

    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${HOST_URL}/sitemap.xml`,
    }
}
