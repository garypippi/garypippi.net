import { Code } from 'mdast'
import hljs from 'highlight.js'

interface Props {
    node: Code
}

export const AppMarkdownCode = ({ node }: Props) => {

    const { value: __html } = hljs.highlight(node.value, {
        language: node.lang || 'bash'
    })

    return (
        <pre className="hljs">
            <code dangerouslySetInnerHTML={{__html}}/>
        </pre>
    )
}
