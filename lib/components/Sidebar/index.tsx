import styles from './styles.module.css'

type Props = {
    title: string
    items: { text: string; href: string }[]
}

/**
 * Sidebar link group
 */
export const Sidebar = ({ title, items }: Props) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.items}>
                {items.map(({ text, href }, i) => (
                    <a key={i} href={href}>
                        {text}
                    </a>
                ))}
            </div>
        </div>
    )
}
