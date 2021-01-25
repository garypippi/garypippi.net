import Link from 'next/link'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppIcon } from '../components/AppIcon'
import * as sns from '../modules/sns'
import { mdiClock, mdiTag } from '@mdi/js'
import { ls } from '../modules/ss'


interface Props {
    posts: ls.Prop
    links: sns.Link[]
}

const indexPage = (props: Props) => (
    <App>
        <AppHeader title="garypippi.net">garypippi.net</AppHeader>
        <div className="2xl:px-96 xl:px-64 lg:px-48 md:px-16 px-4">
            {props.posts.map((attr, i) => (
                <Link
                    key={`post-link-${i}`}
                    href={attr.href}
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

export default indexPage

export const getStaticProps = async () => {
    return ls.getStaticProps().then(posts => ({
        props: {
            links: sns.getLinks(),
            posts
        }
    }))
}
