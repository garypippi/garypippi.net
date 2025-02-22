import { Metadata } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { getPostTags } from '@lib/getPostTags'
import { getPostsByTag } from '@lib/getPostsByTag'
import { Link } from '@lib/components/Link'

export async function generateStaticParams() {
    return getPostTags().then(tags =>
        tags.map(tag => ({
            tag:
                process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
                    ? tag
                    : encodeURIComponent(tag),
        })),
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ tag: string }>
}): Promise<Metadata> {
    const { tag } = await params

    return {
        title: `タグ: ${decodeURIComponent(tag)}`,
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ tag: string }>
}) {
    const { tag } = await params
    const posts = await getPostsByTag(decodeURIComponent(tag))

    return (
        <>
            {posts.map(({ href, attr }, key) => (
                <Link key={key} href={href} attr={attr} />
            ))}
        </>
    )
}
