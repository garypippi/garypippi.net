import { Link as MdastLink } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastLink
}

export const Link = ({ node }: Props) => {
    return (
        <a href={node.url} className={styles.a}>
            {node.children.map((node, i) => (
                <Post key={i} node={node} />
            ))}
        </a>
    )
}
