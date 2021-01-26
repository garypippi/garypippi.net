import { mdiTwitter, mdiGithub } from '@mdi/js'

export interface SnsLink {
    href?: string
    icon: string
}

export const getSnsLinks = (): SnsLink[] => [
    { href: process.env.SNS_TWITTER_URL, icon: mdiTwitter },
    { href: process.env.SNS_GITHUB_URL, icon: mdiGithub }
]
