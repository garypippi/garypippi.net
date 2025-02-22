import { format } from 'date-fns'
import { Post } from '@lib/getPost'
import styles from './styles.module.css'

export const Header = ({ title, date, tags }: Post['attr']) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <span className={styles['attr-date']}>
                {format(new Date(date), 'yyyy/MM/dd HH:mm')}
            </span>
            {tags.map((tag, i) => (
                <a key={i} href={`/tags/${tag}`} className={styles['attr-tag']}>
                    {`#${tag}`}
                </a>
            ))}
        </div>
    )
}
