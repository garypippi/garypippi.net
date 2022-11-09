import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { App } from '../components/App'
import 'highlight.js/styles/atom-one-dark.css'
import { AppMarkdown } from '../components/AppMarkdown'
import { join, basename } from 'path'
import { Root } from 'mdast'
import { getPaths } from '../modules/markdown/getPaths'
import { getMdast } from '../modules/markdown/getMdast'
import { getEntry } from '../modules/markdown/getEntry'
import { Attribute } from '../modules/markdown/types'
import { format } from 'date-fns'
import { css } from 'goober'
import { theme } from '../modules/csstheme'

interface Props {
    attr: Attribute
    root: Root
}

const dir = join(process.cwd(), 'blog')

export const getStaticPaths: GetStaticPaths = async () => {
    return getPaths(dir).then(paths => ({
        paths: paths.map(path => `/${basename(path).replace('.md', '')}`),
        fallback: false
    }))
}

export const getStaticProps: GetStaticProps<Props,{id:string}> = async ({ params }) => {
    return getPaths(dir).then(async paths => {
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
        <App>
            <div className={css`
                margin-bottom: 20px;
            `}>
                <h1 className={css`
                    font-size: 28px;
                    font-weight: normal;
                    margin-bottom: 8px;
                    color: ${theme.color.text};
                `}>
                    {attr.title}
                </h1>
                <span className={css`
                    font-size: 16px;
                    color: ${theme.color.text};
                `}>
                    {format(new Date(attr.date), 'yyyy/MM/dd HH:mm')}
                </span>
                {attr.tags.map((tag, i) => (
                    <span
                        key={i}
                        className={css`
                        font-size: 14px;
                        padding: 2px 4px;
                        margin-left: 4px;
                        color: ${theme.color.text};
                        background-color: ${theme.color.tag};
                    `}>
                        {tag}
                    </span>
                ))}
            </div>
            <AppMarkdown node={root} />
        </App>
    )
}

export default idPage
