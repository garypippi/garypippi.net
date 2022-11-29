import { List } from 'mdast'
import { AppMarkdown } from 'components/AppMarkdown'
import { css } from 'goober'

interface Props {
    node: List
}

export const AppMarkdownList = ({ node }: Props) => {
    return (
        <ul className={css`
            padding-left: 20px;
        `}>
            {node.children.map((node, i) => (
                <AppMarkdown
                    key={i}
                    node={node}/>
            ))}
        </ul>
    )
}
