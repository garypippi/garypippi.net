import { Metadata } from 'next'
import { SITE_TITLE } from '@lib/environments'
import { getPosts } from '@lib/getPosts'
import { Link } from '@lib/components/Link'

export const metadata: Metadata = {
    title: SITE_TITLE,
}

export default async function Page() {
    const posts = await getPosts()

    return (
        <>
            {posts.map(({ attr, href }, key) => (
                <Link key={key} attr={attr} href={href} />
            ))}
        </>
    )
}
