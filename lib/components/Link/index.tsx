import { format } from 'date-fns'
import { Post } from '@lib/getPost'
import styles from './styles.module.css'

type Props = {
    href: Post['href']
    attr: Post['attr']
}

export const Link = ({ href, attr: { title, date, tags } }: Props) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>
                <a href={href}>{title}</a>
            </h3>
            <span className={styles.date}>
                {format(new Date(date), 'yyyy/MM/dd HH:mm')}
            </span>
            {tags.map((tag, i) => (
                <a key={i} href={`/tags/${tag}`} className={styles.tag}>
                    {`#${tag}`}
                </a>
            ))}
        </div>
    )
}
