import { Link } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'
import { color } from '../../modules/css'

interface Props {
    node: Link
}

export const AppMarkdownLink = ({ node }: Props) => {
    return (
        <a
            href={node.url}
            className={css`
                color: ${color['grey-1']};
            `}
        >
            {node.children.map((node, i) => (
                <AppMarkdown key={i} node={node} />
            ))}
        </a>
    )
}
