import { Paragraph } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'
import { theme } from '../../modules/csstheme'

interface Props {
    node: Paragraph
}

export const AppMarkdownParagraph = ({ node }: Props) => {
    return (
        <p className={css`
            font-size: 16px;
            margin: 10px 0;
            color: ${theme.color.text};
        `}>
            {node.children.map((node, i) => (
                <AppMarkdown
                    key={i}
                    node={node}/>
            ))}
        </p>
    )
}
