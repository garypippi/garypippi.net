import { mdiTwitter, mdiGithub } from '@mdi/js'

interface Link {
    link: string
    icon: string
}
export interface Sns {
    twitter: Link
    github: Link
}

export const sns: Sns = {
    twitter: { link: process.env.SNS_TWITTER_URL || '#', icon: mdiTwitter },
    github: { link: process.env.SNS_GITHUB_URL || '#', icon: mdiGithub }
}
