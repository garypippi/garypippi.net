import { InlineCode } from 'mdast'
import { css } from 'goober'
import { theme } from '../../modules/csstheme'

interface Props {
    node: InlineCode
}

export const AppMarkdownInlineCode = ({ node }: Props) => {
    return (
        <code className={css`
            font-weight: normal;
            background-color: #EFF5F5;
            color: ${theme.color.text};
        `}>
            {node.value}
        </code>
    )
}
