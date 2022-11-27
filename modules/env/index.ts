import { join } from 'path'

export const getEnv = () => {
    return {
        name: process.env.NEXT_PUBLIC_MY_NAME || 'Example Name',
        blog: join(process.cwd(), process.env.NEXT_PUBLIC_BLOG_PATH || '')
    }
}
