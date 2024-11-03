import { InlineCode } from 'mdast'
import { css } from 'goober'

interface Props {
    node: InlineCode
}

export const AppMarkdownInlineCode = ({ node }: Props) => {
    return (
        <code
            className={css`
                font-weight: normal;
                background: #eeeeee;
                color: #222222;
                border-radius: 4px;
                font-size: 13px;
                padding: 0px 6px;
            `}
        >
            {node.value}
        </code>
    )
}
