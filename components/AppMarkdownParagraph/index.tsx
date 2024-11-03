import { Paragraph } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'
import { color } from '../../modules/css'

interface Props {
    node: Paragraph
}

export const AppMarkdownParagraph = ({ node }: Props) => {
    return (
        <p
            className={css`
                font-size: 15px;
                margin: 16px 0;
                color: ${color['grey-5']};
                word-break: keep-all;
                overflow-wrap: break-word;
            `}
        >
            {node.children.map((node, i) => (
                <AppMarkdown key={i} node={node} />
            ))}
        </p>
    )
}
