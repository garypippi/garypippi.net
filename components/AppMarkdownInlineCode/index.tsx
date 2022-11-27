import { InlineCode } from 'mdast'
import { css } from 'goober'
import { color } from '../../modules/css'

interface Props {
    node: InlineCode
}

export const AppMarkdownInlineCode = ({ node }: Props) => {
    return (
        <code className={css`
            font-weight: normal;
            background-color: #EFF5F5;
            color: ${color['grey-5']};
        `}>
            {node.value}
        </code>
    )
}
