import { Blockquote } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'

interface Props {
    node: Blockquote
}

export const AppMarkdownBlockquote = ({ node }: Props) => {
    return (
        <blockquote className={css`
            &>p {
                color: #6B728E;
                border-left: 2px solid #6B728E;
                padding: 2px 0 2px 6px !important;
            }
        `}>
            {node.children.map((node, key) => (
                <AppMarkdown key={key} node={node} />
            ))}
        </blockquote>
    )
}
