import { Metadata } from 'next'
import { SITE_TITLE } from '@lib/environments'
import { getPageCount, getPostsByPage } from '@lib/getPostsByPage'
import { Link } from '@lib/components/Link'
import { Pager } from '@lib/components/Pager'

/**
 * 1ページ目は `/` が担当するので 2 以降だけを生成する
 */
export async function generateStaticParams() {
    return getPageCount().then(total =>
        Array.from({ length: total - 1 }, (_, i) => ({
            page: String(i + 2),
        })),
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ page: string }>
}): Promise<Metadata> {
    const { page } = await params

    return {
        title: `${SITE_TITLE} (${page}ページ目)`,
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ page: string }>
}) {
    const { page } = await params
    const current = Number(page)
    const posts = await getPostsByPage(current)
    const total = await getPageCount()

    return (
        <>
            {posts.map(({ attr, href }, key) => (
                <Link key={key} attr={attr} href={href} />
            ))}
            <Pager current={current} total={total} />
        </>
    )
}
