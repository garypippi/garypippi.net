import { List as MdastList } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastList
}

export const List = ({ node }: Props) => {
    return (
        <ul className={styles.ul}>
            {node.children.map((node, i) => (
                <Post key={i} node={node} />
            ))}
        </ul>
    )
}
