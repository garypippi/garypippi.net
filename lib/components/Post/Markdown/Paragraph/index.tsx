import { Paragraph as MdastParagraph } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastParagraph
}

export const Paragraph = ({ node }: Props) => {
    return (
        <p className={styles.p}>
            {node.children.map((node, i) => (
                <Post key={i} node={node} />
            ))}
        </p>
    )
}
