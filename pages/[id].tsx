import { GetStaticProps, GetStaticPaths } from 'next'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppPage } from '../components/AppPage'
import { AppIcon } from '../components/AppIcon'
import { AppPost } from '../components/AppPost'
import { mdiClock, mdiTag } from '@mdi/js'
import { id, getStaticPropsWithInitialState } from '../modules/ss'
import { Post } from '../types'
import 'highlight.js/styles/atom-one-dark.css'
import { _lexer as mdParse, root } from '../modules/md/lexer'


interface Props {
    post: Post
}


const idPage = ({ post }: Props) => {

    console.log(mdParse(post.rawBody, [root]))

    return (
        <App>
            <AppHeader title={post.attr.title}>garypippi.net</AppHeader>
            <AppPage size="lg">
                <h1 className="text-3xl">{post.attr.title}</h1>
                <div className="flex flex-row justify-start items-center mt-2">
                    <AppIcon size={16} className="text-gray-500 mr-2">{mdiClock}</AppIcon>
                    <span>{post.attr.date}</span>
                    <AppIcon size={16} className="text-gray-500 ml-2 mr-2">{mdiTag}</AppIcon>
                    {post.attr.tags.map((tag, i) => (
                        <span className="text-xs rounded bg-gray-100 px-2 py-1 mr-2" key={i}>{tag}</span>
                    ))}
                </div>
                {mdParse(post.rawBody, [root]).map((token, key) => {
                    return (
                        <AppPost
                            key={key}
                            token={token}
                        />
                    )
                })}
            </AppPage>
            <AppFooter />
        </App>
    )
}

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
            : { props: getStaticPropsWithInitialState({ post }) }
    })
}

