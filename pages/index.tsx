import { join } from 'path'
import { GetStaticProps, NextPage } from 'next'
import { App } from '../components/App'
import { getPaths } from '../modules/markdown/getPaths'
import { getEntry } from '../modules/markdown/getEntry'
import { Entry } from '../modules/markdown/types'
import { AppEntry } from '../components/AppEntry'

const path = join(process.cwd(), 'blog')

interface Props {
    entries: Entry[]
}

const TopPage: NextPage<Props> = ({ entries }) => {
    return (
        <App>
            {entries.map((entry, i) => (
                <AppEntry
                    key={i}
                    entry={entry}/>
            ))}
        </App>
    )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return getPaths(path)
        .then(paths => Promise.all(paths.map(path => getEntry(path))))
        .then(entries => ({ props: { entries } }))
}


export default TopPage
