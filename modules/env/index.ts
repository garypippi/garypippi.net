import { join } from 'path'

export const getEnv = () => {
    return {
        name: process.env.NEXT_PUBLIC_MY_NAME || 'Example Name',
        blog: join(process.cwd(), process.env.NEXT_PUBLIC_BLOG_PATH || ''),
        github: process.env.NEXT_PUBLIC_GITHUB || '/',
        twitter: process.env.NEXT_PUBLIC_TWITTER || '/',
        s3: {
            host: process.env.NEXT_PUBLIC_S3_HOST || '',
            path: process.env.NEXT_PUBLIC_S3_PATH || ''
        }
    }
}
