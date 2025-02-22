import { Heading as MdastHeading } from 'mdast'
import { Post } from '../..'
import styles from './styles.module.css'

type Props = {
    node: MdastHeading
}

const createTag = (depth: MdastHeading['depth']) => ({
    HeadingTag: `h${depth}` as const,
    ...(depth !== 2 && depth !== 3
        ? {}
        : {
              className: styles[`h${depth}`],
          }),
})

export const Heading = ({ node }: Props) => {
    const { HeadingTag, className } = createTag(node.depth)

    return (
        <HeadingTag className={className}>
            {node.children.map((node, i) => (
                <Post key={i} node={node} />
            ))}
        </HeadingTag>
    )
}
