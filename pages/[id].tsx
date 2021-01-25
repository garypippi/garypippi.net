import { GetStaticPaths, GetStaticProps } from 'next'
import { join, basename } from 'path'
import * as fs from 'fs'
import { promisify } from 'util'
import { ls } from '../modules/fs/ls'
import { fm } from '../modules/fs/fm'
import { converter } from '../modules/md'
import { toml } from '../modules/md/toml'
import * as sns from '../modules/sns'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppIcon } from '../components/AppIcon'
import { mdiClock, mdiTag } from '@mdi/js'
import 'highlight.js/styles/atom-one-dark.css'


interface Props {
    links: sns.Link[]
    body: string
    attr: {
        title: string
        date: string
        tags: string[]
    }
}

const read = promisify(fs.readFile)

const id = (props: Props) => (
    <App>
        <AppHeader title={props.attr.title}>garypippi.net</AppHeader>
        <div className="2xl:px-64 xl:px-48 lg:px-16 md:px-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl">{props.attr.title}</h1>
                <div className="flex flex-row justify-start items-center mt-2">
                    <AppIcon size={16} className="text-gray-500 mr-2">{mdiClock}</AppIcon>
                    <span>{props.attr.date}</span>
                    <AppIcon size={16} className="text-gray-500 ml-2 mr-2">{mdiTag}</AppIcon>
                    {props.attr.tags.map((tag, i) => (
                        <span className="text-xs rounded bg-gray-100 px-2 py-1 mr-2" key={i}>{tag}</span>
                    ))}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: props.body}}></div>
        </div>
        <AppFooter links={props.links} />
    </App>
)

export const getStaticPaths: GetStaticPaths = async () => {
    return ls(join(process.cwd(), 'blog')).then(paths => ({
        fallback: false,
        paths: paths.map(path => `/${basename(path).slice(0, -3)}`)
    }))
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const paths = await ls(join(process.cwd(), 'blog'))
    const path = paths.find(path => path.includes(params?.id as string))

    if (! path) {
        return {
            notFound: true
        }
    }

    return read(path).then(buffer => {
        const [attr, body] = fm(buffer.toString())
        return {
            props: {
                links: sns.getLinks(),
                attr: toml(attr),
                body: converter.makeHtml(body)
            }
        }
    })
}

export default id
