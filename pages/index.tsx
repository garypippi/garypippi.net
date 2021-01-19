import { App } from '../components/App'
import { AppIcon } from '../components/AppIcon'
import Head from 'next/head'
import { promisify } from 'util'
import { join, basename } from 'path'
import * as fs from 'fs'
import { ls } from '../modules/fs/ls'
import { fm } from '../modules/fs/fm'
import { toml } from '../modules/md/toml'
import { sns } from '../modules/sns'
import { mdiClock, mdiTag } from '@mdi/js'

const read = promisify(fs.readFile)

interface Props {
    posts: Post[]
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
        <div className="py-8 my-8 flex flex-row justify-center items-center text-gray-900">
            <h1 className="text-5xl">garypippi</h1>
        </div>
        <div className="2xl:px-96 xl:px-64 lg:px-48 md:px-16 px-4">
            {props.posts.map((attr, i) => (
                <a className="my-6 py-2 px-2 block text-sm hover:bg-gray-100" href={attr.link} key={i}>
                    <h2 className="text-xl">{attr.title}</h2>
                    <div className="flex flex-row justify-start items-center mt-2">
                        <AppIcon size={16} class="text-gray-500 mr-2">{mdiClock}</AppIcon>
                        <span>{attr.date}</span>
                    </div>
                    <div className="flex flex-row justify-start items-center mt-1">
                        <AppIcon size={16} class="text-gray-500 ml-px mr-2">{mdiTag}</AppIcon>
                        {attr.tags.map((tag, i) => (
                            <span className="text-xs rounded bg-gray-100 px-2 py-1 mr-2" key={i}>{tag}</span>
                        ))}
                    </div>
                </a>
            ))}
        </div>
        <div className="2xl:px-64 xl:px-48 lg:px-16 md:px-8 px-4 my-8 py-8 text-gray-400">
            <div className="flex flex-row justify-center items-center">
                <a href={sns.twitter.link} className="mr-2">
                    <AppIcon size={24} class="inline">{sns.twitter.icon}</AppIcon>
                </a>
                <a href={sns.github.link}>
                    <AppIcon size={24} class="inline">{sns.github.icon}</AppIcon>
                </a>
            </div>
        </div>
    </App>
)


export const getStaticProps = async () => {
    return ls(join(process.cwd(), 'blog')).then(async paths => {
        return {
            props: {
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
