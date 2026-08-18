import { Metadata } from 'next'
import { SITE_TITLE } from '@lib/environments'
import { getPageCount, getPostsByPage } from '@lib/getPostsByPage'
import { Link } from '@lib/components/Link'
import { Pager } from '@lib/components/Pager'

export const metadata: Metadata = {
    title: SITE_TITLE,
}

export default async function Page() {
    const posts = await getPostsByPage(1)
    const total = await getPageCount()

    return (
        <>
            {posts.map(({ attr, href }, key) => (
                <Link key={key} attr={attr} href={href} />
            ))}
            <Pager current={1} total={total} />
        </>
    )
}
