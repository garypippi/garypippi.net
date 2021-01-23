import Head from 'next/head'
import Link from 'next/link'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppIcon } from '../components/AppIcon'
import { promisify } from 'util'
import { join, basename } from 'path'
import * as fs from 'fs'
import { ls } from '../modules/fs/ls'
import { fm } from '../modules/fs/fm'
import { toml } from '../modules/md/toml'
import * as sns from '../modules/sns'
import { mdiClock, mdiTag } from '@mdi/js'

const read = promisify(fs.readFile)

interface Props {
    gid: string
    posts: Post[]
    links: sns.Link[]
}
interface Post {
    link: string
    title: string
    date: string
    tags: string[]
}

const index = (props: Props) => (
    <App>
        <Head>
            <title>garypippi.net</title>
        </Head>
        <AppHeader />
        <div>{props.gid}</div>
        <div className="2xl:px-96 xl:px-64 lg:px-48 md:px-16 px-4">
            {props.posts.map((attr, i) => (
                <Link
                    key={`post-link-${i}`}
                    href={attr.link}
                >
                    <a className="my-6 py-2 px-2 block text-sm hover:bg-gray-100">
                        <h2 className="text-xl">{attr.title}</h2>
                        <div className="flex flex-row justify-start items-center mt-2">
                            <AppIcon size={16} className="text-gray-500 mr-2">{mdiClock}</AppIcon>
                            <span>{attr.date}</span>
                        </div>
                        <div className="flex flex-row justify-start items-center mt-1">
                            <AppIcon size={16} className="text-gray-500 ml-px mr-2">{mdiTag}</AppIcon>
                            {attr.tags.map((tag, i) => (
                                <span className="text-xs rounded bg-gray-100 px-2 py-1 mr-2" key={i}>{tag}</span>
                            ))}
                        </div>
                    </a>
                </Link>
            ))}
        </div>
        <AppFooter links={props.links} />
    </App>
)


export const getStaticProps = async () => {
    return ls(join(process.cwd(), 'blog')).then(async paths => {
        return {
            props: {
                links: sns.getLinks(),
                posts: await Promise.all(
                    paths.map(async path => {
                        return read(path).then(buffer => ({
                            link: `/${basename(path).slice(0, -3)}`,
                            ...toml(fm(buffer.toString())[0])
                        }))
                    })
                )
            }
        }
    })
}


export default index
