import { Code } from 'mdast'
import hljs from 'highlight.js'
import { css } from 'goober'
import { mergeClass } from '../../modules/css'

interface Props {
    node: Code
}

export const AppMarkdownCode = ({ node }: Props) => {

    const { value: __html } = hljs.highlight(node.value, {
        language: node.lang || 'bash'
    })

    return (
        <pre className={mergeClass("hljs", css`
            margin: 20px 0;
            padding: 10px;
        `)}>
            <code dangerouslySetInnerHTML={{__html}}/>
        </pre>
    )
}
