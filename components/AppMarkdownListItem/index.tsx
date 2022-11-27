import { ListItem } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'
import { color } from '../../modules/css'

interface Props {
    node: ListItem
}

export const AppMarkdownListItem = ({ node }: Props) => {

    const [child] = node.children

    if (child.type === 'paragraph') {
        return (
            <li className={css`
                font-size: 16px;
                color: ${color['grey-5']};
            `}>
                {child.children.map((node, i) => (
                    <AppMarkdown
                        key={i}
                        node={node}/>
                ))}
            </li>
        )
    }

    return (
        <></>
    )
}
