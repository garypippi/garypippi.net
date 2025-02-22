import { Root as MdastRoot } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastRoot
}

export const Root = ({ node }: Props) => {
    return (
        <div className={styles.root}>
            {node.children.map((node, i) => (
                <Post key={i} node={node} />
            ))}
        </div>
    )
}
