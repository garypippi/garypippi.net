import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { css } from 'goober'
import { lg } from '../modules/css'
import { BLOG_PATH, SITE_TITLE } from '../modules/env'
import { getPaths } from '../modules/markdown/getPaths'
import { getEntry } from '../modules/markdown/getEntry'
import { Entry } from '../modules/markdown/types'
import { App } from '../components/App'
import { AppMe } from '../components/AppMe'
import { AppBlogEntries } from '../components/AppBlogEntries'

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
                    @media screen and (max-width: ${lg}px) {
                        margin-bottom: 20px;
                    }
                `}
            />
            <AppBlogEntries entries={entries} />
        </App>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return getPaths(BLOG_PATH)
        .then(paths => Promise.all(paths.map(path => getEntry(path))))
        .then(entries => entries.map(({ attr, href }) => ({ attr, href })))
        .then(entries => ({ props: { entries } }))
}

export default indexPage
