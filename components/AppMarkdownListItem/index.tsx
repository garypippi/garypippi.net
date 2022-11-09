import { ListItem } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'
import { theme } from '../../modules/csstheme'

interface Props {
    node: ListItem
}

export const AppMarkdownListItem = ({ node }: Props) => {

    const [child] = node.children

    if (child.type === 'paragraph') {
        return (
            <li className={css`
                font-size: 16px;
                color: ${theme.color.text};
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
