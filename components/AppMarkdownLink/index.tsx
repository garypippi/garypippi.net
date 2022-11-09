import { Link } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'
import { theme } from '../../modules/csstheme'

interface Props {
    node: Link
}

export const AppMarkdownLink = ({ node }: Props) => {
    return (
        <a
            href={node.url}
            className={css`
                color: ${theme.color.link};
        `}>
            {node.children.map((node, i) => (
                <AppMarkdown
                    key={i}
                    node={node}/>
            ))}
        </a>
    )
}
