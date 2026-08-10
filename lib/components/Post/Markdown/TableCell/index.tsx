import { AlignType, TableCell as MdastTableCell } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastTableCell
    align?: AlignType
    head?: boolean
}

export const TableCell = ({ node, align, head }: Props) => {
    const Tag = head ? 'th' : 'td'

    return (
        <Tag
            className={align ? `${styles.cell} ${styles[align]}` : styles.cell}
        >
            {node.children.map((node, i) => (
                <Post key={i} node={node} />
            ))}
        </Tag>
    )
}
