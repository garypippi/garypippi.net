import { GetStaticProps } from 'next'
import { useSnsLinks } from '../modules/store'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppPage } from '../components/AppPage'
import { AppIcon } from '../components/AppIcon'
import { getStaticPropsWithInitialState } from '../modules/ss'
import { mdiLanguageTypescript, mdiReact, mdiTailwind } from '@mdi/js'

export const AboutPage = () => {
    return (
        <App>
            <AppHeader title="About Me">About Me</AppHeader>
            <AppPage size="md">
                <div className="mb-8">
                    <span className="my-2">@garypippi</span>
                    <ul className="my-2 text-sm text-gray-800">
                        <li>1996 ~ 2012 生存</li>
                        <li>2012 ~ 2013 Grand Haven, MI, USA</li>
                        <li>2014 ~ 2018 琉球大学</li>
                        <li>2018 ~ 2020 沖縄のホームページ屋さん</li>
                        <li>2020 ~ 20?? 札幌のWEB屋さん</li>
                    </ul>
                </div>
                <div className="mb-8 text-center md:text-left">
                    {useSnsLinks().map((link, i) => link.href && (
                        <a key={`footer-sns-links-${i}`} href={link.href} className={`mr-2 last:mr-0 ${link.class || 'text-gray-600'}`}>
                            <AppIcon size={24}>{link.icon}</AppIcon>
                        </a>
                    ))}
                    <pre className="my-2 text-xs text-gray-800">
                        <code>gpg --search-keys garypippi</code>
                    </pre>
                </div>
                <div className="mb-8">
                    <h2 className="my-2">garypippi.net is built using ...</h2>
                    <div className="text-sm text-gray-800">
                        <AppIcon size={48}>{mdiLanguageTypescript}</AppIcon>
                        <AppIcon size={48}>{mdiReact}</AppIcon>Next.js
                        <AppIcon size={48}>{mdiTailwind}</AppIcon>
                    </div>
                </div>
            </AppPage>
            <AppFooter />
        </App>
    )
}

export default AboutPage

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: getStaticPropsWithInitialState({})
    }
}
