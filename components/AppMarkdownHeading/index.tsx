import { Heading } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'

interface Props {
    node: Heading
}

const classMap: {[depth in Heading['depth']]:string} = {
    1: css`
    `,
    2: css`
        font-size: 22px;
        font-weight: normal;
        margin: 20px 0 10px 0;
        color: #3C4048;
    `,
    3: css`
        font-size: 20px;
        font-weight: normal;
        margin: 20px 0 10px 0;
        color: #3C4048;
    `,
    4: css`
    `,
    5: css`
    `,
    6: css`
    `
}

export const AppMarkdownHeading = ({ node }: Props) => {

    const HeadingTag: `h${Heading['depth']}` = `h${node.depth}`

    return (
        <HeadingTag className={classMap[node.depth]}>
            {node.children.map((node, i) => (
                <AppMarkdown
                    key={i}
                    node={node}/>
            ))}
        </HeadingTag>
    )
}
