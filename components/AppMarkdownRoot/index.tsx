import { Root } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'

interface Props {
    node: Root
}

export const AppMarkdownRoot = ({ node }: Props) => {
    return (
        <div>
            {node.children.map((node, i) => (
                <AppMarkdown key={i} node={node} />
            ))}
        </div>
    )
}
