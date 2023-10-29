import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { App } from '../components/App'
import 'highlight.js/styles/atom-one-dark.css'
import { AppMarkdown } from '../components/AppMarkdown'
import { basename } from 'path'
import { Root } from 'mdast'
import { BLOG_PATH } from '../modules/env'
import { getPaths } from '../modules/markdown/getPaths'
import { getMdast } from '../modules/markdown/getMdast'
import { getEntry } from '../modules/markdown/getEntry'
import { Attribute } from '../modules/markdown/types'
import { format } from 'date-fns'
import { css } from 'goober'
import { color, md } from '../modules/css'
import Link from 'next/link'

interface Props {
    attr: Attribute
    root: Root
}

export const getStaticPaths: GetStaticPaths = async () => {
    return getPaths(BLOG_PATH).then(paths => ({
        paths: paths.map(path => `/${basename(path).replace('.md', '')}`),
        fallback: false
    }))
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({ params }) => {
    return getPaths(BLOG_PATH).then(async paths => {
        return getEntry(paths.find(path => path.includes(params?.id || '')) || '').then(async entry => {
            return getMdast(entry.body).then(root => {
                return {
                    props: {
                        attr: entry.attr,
                        root
                    }
                }
            })
        })
    })
}

const idPage: NextPage<Props> = ({ attr, root }) => {
    return (
        <App className={css`
            max-width: ${md}px;
            margin: 0 auto;
            @media screen and (max-width: ${md}px){
                max-width: 100%;
            }
        `}>
            <Head>
                <title>{attr.title}</title>
            </Head>
            <div className={css`
                margin-bottom: 40px;
            `}>
                <h1 className={css`
                    font-size: 28px;
                    font-weight: normal;
                    margin-bottom: 8px;
                    color: ${color['grey-6']};
                `}>
                    {attr.title}
                </h1>
                <span className={css`
                    font-size: 16px;
                    color: ${color['grey-5']};
                `}>
                    {format(new Date(attr.date), 'yyyy/MM/dd HH:mm')}
                </span>
                {attr.tags.map((tag, i) => (
                    <Link
                        key={i}
                        href={`/tags/${tag}`}
                        className={css`
                            font-size: 16px;
                            margin-left: 4px;
                            color: ${color['grey-1']};
                    `}>
                        {`#${tag}`}
                    </Link>
                ))}
            </div>
            <AppMarkdown node={root} />
        </App>
    )
}

export default idPage
