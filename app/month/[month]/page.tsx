import { Metadata } from 'next'
import { getPostMonths } from '@lib/getPostMonths'
import { getPostsByMonth } from '@lib/getPostsByMonth'
import { Link } from '@lib/components/Link'

export async function generateStaticParams() {
    return getPostMonths().then(months =>
        Object.keys(months).map(month => ({ month })),
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ month: string }>
}): Promise<Metadata> {
    const { month } = await params

    return {
        title: `月別: ${month}`,
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ month: string }>
}) {
    const { month } = await params
    const posts = await getPostsByMonth(month)

    return (
        <>
            {posts.map(({ href, attr }, key) => (
                <Link key={key} href={href} attr={attr} />
            ))}
        </>
    )
}
