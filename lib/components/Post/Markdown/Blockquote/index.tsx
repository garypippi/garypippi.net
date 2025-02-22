import { Blockquote as MdastBlockquote } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastBlockquote
}

export const Blockquote = ({ node }: Props) => {
    return (
        <blockquote className={styles.blockquote}>
            {node.children.map((node, key) => (
                <Post key={key} node={node} />
            ))}
        </blockquote>
    )
}
