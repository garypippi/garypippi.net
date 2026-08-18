import { YearGroup } from '@lib/getPostMonthsByYear'
import styles from './styles.module.css'

type Props = {
    title: string
    groups: YearGroup[]
}

/**
 * 月別一覧。年ごとに1行にまとめ、2件以上の月だけ件数を上付きで添える
 */
export const MonthList = ({ title, groups }: Props) => {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <dl className={styles.years}>
                {groups.map(({ year, months }) => (
                    <div key={year} className={styles.row}>
                        <dt className={styles.year}>{year}</dt>
                        <dd className={styles.months}>
                            {months.map(({ label, href, count }) => (
                                <a
                                    key={href}
                                    href={href}
                                    title={`${count}件`}
                                    className={styles.month}
                                >
                                    {label}
                                    {count > 1 && (
                                        <sup className={styles.count}>
                                            {count}
                                        </sup>
                                    )}
                                </a>
                            ))}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}
