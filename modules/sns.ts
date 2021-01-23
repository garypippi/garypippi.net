import { mdiTwitter, mdiGithub } from '@mdi/js'

export interface Link {
    link?: string
    icon: string
}

export const getLinks = (): Link[] => [
    {link: process.env.SNS_TWITTER_URL, icon: mdiTwitter },
    {link: process.env.SNS_GITHUB_URL, icon: mdiGithub }
]
