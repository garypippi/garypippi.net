import { List } from 'mdast'
import { AppMarkdown } from 'components/AppMarkdown'

interface Props {
    node: List
}

export const AppMarkdownList = ({ node }: Props) => {
    return (
        <ul>
            {node.children.map((node, i) => (
                <AppMarkdown
                    key={i}
                    node={node}/>
            ))}
        </ul>
    )
}
