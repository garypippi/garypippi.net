import { Fragment } from 'react'
import { ListItem as MdastListItem } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastListItem
}

export const ListItem = ({ node }: Props) => {
    return (
        <li className={styles.li}>
            {node.children.map((child, i) =>
                child.type === 'paragraph' ? (
                    <Fragment key={i}>
                        {child.children.map((child, j) => (
                            <Post key={`${i}${j}`} node={child} />
                        ))}
                    </Fragment>
                ) : (
                    <Post key={i} node={child} />
                ),
            )}
        </li>
    )
}
