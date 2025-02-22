import { ReactNode } from 'react'
import { SITE_TITLE, GITHUB, TWITTER } from '@lib/environments'
import { getPostTags } from '@lib/getPostTags'
import { getPostMonths } from '@lib/getPostMonths'
import { Sidebar } from '@lib/components/Sidebar'
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

const getSidebarMonthItems = async () => {
    return getPostMonths().then(months =>
        Object.keys(months).map(month => ({
            text: `${month}(${months[month]})`,
            href: `/month/${month}`,
        })),
    )
}

export default async function RootLayout({ children }: Props) {
    const tags = await getSidebarTagItems()
    const months = await getSidebarMonthItems()

    return (
        <html lang="ja">
            <head />
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
                            <Sidebar title="月別" items={months} />
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
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
