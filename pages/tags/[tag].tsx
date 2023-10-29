import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import { css } from 'goober'
import { SITE_TITLE, BLOG_PATH } from '../../modules/env'
import { getPaths } from '../../modules/markdown/getPaths'
import { getEntry } from '../../modules/markdown/getEntry'
import { Entry } from '../../modules/markdown/types'
import { App } from '../../components/App'
import { AppMe } from '../../components/AppMe'
import { AppBlogEntries } from '../../components/AppBlogEntries'

interface Props {
    entries: Omit<Entry, 'body'>[]
}

const indexPage: NextPage<Props> = ({ entries }) => {
    return (
        <App>
            <Head>
                <title>{SITE_TITLE}</title>
            </Head>
            <AppMe
                className={css`
                    margin-bottom: 80px;
            `} />
            <AppBlogEntries
                entries={entries} />
        </App>
    )
}

export const getStaticProps: GetStaticProps<Props, { tag: string }> = async ({ params }) => {
    return getPaths(BLOG_PATH)
        .then(paths => Promise.all(paths.map(path => getEntry(path))))
        .then(entries => entries.filter(({ attr }) => attr.tags.includes(params?.tag || '')))
        .then(entries => entries.map(({ attr, href }) => ({ attr, href })))
        .then(entries => ({ props: { entries } }))
}

export const getStaticPaths: GetStaticPaths<{ tag: string }> = async () => {
    return getPaths(BLOG_PATH)
        .then(paths => Promise.all(paths.map(path => getEntry(path))))
        .then(entries => entries.reduce<string[]>((a, v) => a.concat(v.attr.tags), []))
        .then(tags => ({
            paths: tags.map(tag => `/tags/${tag}`),
            fallback: false
        }))
}


export default indexPage
