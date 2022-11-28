import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { css } from 'goober'
import { getEnv } from '../../modules/env'
import { getPaths } from '../../modules/markdown/getPaths'
import { getEntry } from '../../modules/markdown/getEntry'
import { Entry } from '../../modules/markdown/types'
import { App } from '../../components/App'
import { AppMe } from '../../components/AppMe'
import { AppBlogEntries } from '../../components/AppBlogEntries'

interface Props {
    entries: Omit<Entry,'body'>[]
}

const indexPage: NextPage<Props> = ({ entries }) => {
    return (
        <App>
            <AppMe
                className={css`
                    margin-bottom: 80px;
            `}/>
            <AppBlogEntries
                entries={entries}/>
        </App>
    )
}

export const getStaticProps: GetStaticProps<Props,{tag:string}> = async ({ params }) => {
    return getPaths(getEnv().blog)
        .then(paths => Promise.all(paths.map(path => getEntry(path))))
        .then(entries => entries.filter(({ attr }) => attr.tags.includes(params?.tag || '')))
        .then(entries => entries.map(({ attr, href }) => ({ attr, href })))
        .then(entries => ({ props: { entries } }))
}

export const getStaticPaths: GetStaticPaths<{tag:string}> = async () => {
    return getPaths(getEnv().blog)
        .then(paths => Promise.all(paths.map(path => getEntry(path))))
        .then(entries => entries.reduce<string[]>((a, v) => a.concat(v.attr.tags), []))
        .then(tags => ({
            paths: tags.map(tag => `/tags/${tag}`),
            fallback: false
        }))
}


export default indexPage
