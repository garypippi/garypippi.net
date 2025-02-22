import { Code as MdastCode } from 'mdast'
import hljs from 'highlight.js'
import styles from './styles.module.css'

type Props = {
    node: MdastCode
}

export const Code = ({ node }: Props) => {
    const { value: __html } = hljs.highlight(node.value, {
        language: node.lang || 'bash',
    })

    return (
        <pre className={['hljs', styles.pre].join(' ')}>
            <code dangerouslySetInnerHTML={{ __html }} />
        </pre>
    )
}
