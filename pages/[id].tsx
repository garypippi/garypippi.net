import { GetStaticProps, GetStaticPaths } from 'next'
import * as sns from '../modules/sns'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppIcon } from '../components/AppIcon'
import { mdiClock, mdiTag } from '@mdi/js'
import { id } from '../modules/ss'
import { Post } from '../types'
import 'highlight.js/styles/atom-one-dark.css'


interface Props {
    links: sns.Link[]
    post: Post
}


const idPage = ({ post, links }: Props) => (
    <App>
        <AppHeader title={post.attr.title}>garypippi.net</AppHeader>
        <div className="2xl:px-64 xl:px-48 lg:px-16 md:px-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl">{post.attr.title}</h1>
                <div className="flex flex-row justify-start items-center mt-2">
                    <AppIcon size={16} className="text-gray-500 mr-2">{mdiClock}</AppIcon>
                    <span>{post.attr.date}</span>
                    <AppIcon size={16} className="text-gray-500 ml-2 mr-2">{mdiTag}</AppIcon>
                    {post.attr.tags.map((tag, i) => (
                        <span className="text-xs rounded bg-gray-100 px-2 py-1 mr-2" key={i}>{tag}</span>
                    ))}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: post.body}}></div>
        </div>
        <AppFooter links={links} />
    </App>
)

export default idPage

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        fallback: false,
        paths: await id.getStaticPaths()
    }
}

export const getStaticProps: GetStaticProps<Props> = async ctx => {
    return id.getStaticProps(ctx.params?.id as string).then(post => {
        return ! post
            ? { notFound: true }
            : {
                props: {
                    links: sns.getLinks(),
                    post
                }
            }
    })
}

