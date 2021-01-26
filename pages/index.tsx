import Link from 'next/link'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppPage } from '../components/AppPage'
import { AppIcon } from '../components/AppIcon'
import { mdiClock, mdiTag } from '@mdi/js'
import { ls, getStaticPropsWithInitialState } from '../modules/ss'


interface Props {
    posts: ls.Prop
}

const indexPage = (props: Props) => (
    <App>
        <AppHeader title="garypippi.net">garypippi.net</AppHeader>
        <AppPage size="md">
            {props.posts.map((attr, i) => (
                <Link
                    key={`post-link-${i}`}
                    href={attr.href}
                >
                    <a className="my-6 py-2 px-2 md:py-4 md:px-6 block hover:bg-gray-100">
                        <h2 className="my-2 md:text-lg">{attr.title}</h2>
                        <div className="flex flex-row justify-start items-center">
                            <AppIcon size={16} className="text-gray-500 mr-2">{mdiClock}</AppIcon>
                            <span className="text-sm">{attr.date}</span>
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
        </AppPage>
        <AppFooter />
    </App>
)

export default indexPage

export const getStaticProps = async () => {
    return ls.getStaticProps().then(posts => ({
        props: getStaticPropsWithInitialState({
            posts
        })
    }))
}
