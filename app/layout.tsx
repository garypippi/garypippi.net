import { ReactNode } from 'react'
import Script from 'next/script'
import {
    SITE_TITLE,
    GITHUB,
    TWITTER,
    UMAMI_WEBSITE_ID,
} from '@lib/environments'
import { getPostTags } from '@lib/getPostTags'
import { getPostMonthsByYear } from '@lib/getPostMonthsByYear'
import { Sidebar } from '@lib/components/Sidebar'
import { MonthList } from '@lib/components/MonthList'
import styles from './layout.module.css'
import '@lib/global.css'

type Props = {
    children: ReactNode
}

const getSidebarTagItems = async () => {
    return getPostTags().then(tags =>
        tags.map(tag => ({ text: `#${tag}`, href: `/tags/${tag}` })),
    )
}

export default async function RootLayout({ children }: Props) {
    const tags = await getSidebarTagItems()
    const months = await getPostMonthsByYear()

    return (
        <html lang="ja">
            <head>
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title={SITE_TITLE}
                    href="/feed.xml"
                />
            </head>
            <body className={styles.body}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>
                            <a href="/">{SITE_TITLE}</a>
                        </h1>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.side}>
                            <Sidebar title="タグリスト" items={tags} />
                            <MonthList title="月別" groups={months} />
                        </div>
                        <div className={styles.main}>{children}</div>
                    </div>
                    <div className={styles.footer}>
                        <span>{SITE_TITLE}</span>
                        <div className={styles.links}>
                            <a href={`https://github.com/${GITHUB}`}>
                                {'GitHub'}
                            </a>
                            <a href={`https://x.com/${TWITTER}`}>
                                {'X(Twitter)'}
                            </a>
                            <a href="/feed.xml">{'RSS'}</a>
                        </div>
                    </div>
                </div>
            </body>
            {UMAMI_WEBSITE_ID && (
                <Script
                    src="/umami/script.js"
                    data-website-id={UMAMI_WEBSITE_ID}
                    strategy="afterInteractive"
                />
            )}
        </html>
    )
}
