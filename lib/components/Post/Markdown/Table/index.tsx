import { Table as MdastTable } from 'mdast'
import { TableRow } from '../TableRow'
import styles from './styles.module.css'

type Props = {
    node: MdastTable
}

export const Table = ({ node: { align, children } }: Props) => {
    const [head, ...body] = children

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                {head && (
                    <thead>
                        <TableRow node={head} align={align} head />
                    </thead>
                )}
                <tbody>
                    {body.map((node, i) => (
                        <TableRow key={i} node={node} align={align} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
