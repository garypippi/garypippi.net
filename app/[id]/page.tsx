import 'highlight.js/styles/atom-one-dark.css'
import { basename } from 'path'
import { Metadata } from 'next'
import { Post } from '@lib/components/Post'
import { Header } from '@lib/components/Header'
import { getMdast } from '@lib/getMdast'
import { getPostById } from '@lib/getPostById'
import { getPostPaths } from '@lib/getPostPaths'

export async function generateStaticParams() {
    return getPostPaths().then(paths =>
        paths.map(path => ({ id: basename(path).replace(/\.md$/, '') })),
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params

    return {
        title: (await getPostById(id)).attr.title,
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const { attr, body } = await getPostById(id)
    const root = await getMdast(body)

    return (
        <>
            <Header {...attr} />
            <Post node={root} />
        </>
    )
}
