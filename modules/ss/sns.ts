import { mdiTwitter, mdiGithub } from '@mdi/js'

export interface SnsLink {
    href?: string
    icon: string
    class?: string
}

export const getSnsLinks = (): SnsLink[] => [
    { href: process.env.SNS_TWITTER_URL, icon: mdiTwitter, class: 'text-blue-300' },
    { href: process.env.SNS_GITHUB_URL, icon: mdiGithub }
]
