import { getPageHref } from '@lib/getPostsByPage'
import styles from './styles.module.css'

type Props = {
    current: number
    total: number
}

export const Pager = ({ current, total }: Props) => {
    if (total <= 1) {
        return null
    }

    const pages = Array.from({ length: total }, (_, i) => i + 1)

    return (
        <nav className={styles.container} aria-label="ページ送り">
            {pages.map(page =>
                page === current ? (
                    <span key={page} className={styles.current}>
                        {page}
                    </span>
                ) : (
                    <a
                        key={page}
                        className={styles.link}
                        href={getPageHref(page)}
                    >
                        {page}
                    </a>
                ),
            )}
        </nav>
    )
}
