import { InlineCode as MdastInlineCode } from 'mdast'
import styles from './styles.module.css'

type Props = {
    node: MdastInlineCode
}

export const InlineCode = ({ node }: Props) => {
    return <code className={styles.code}>{node.value}</code>
}
