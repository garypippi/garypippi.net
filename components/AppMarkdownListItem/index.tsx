import { ListItem } from 'mdast'
import { AppMarkdown } from '../AppMarkdown'
import { css } from 'goober'
import { color } from '../../modules/css'

interface Props {
    node: ListItem
}

export const AppMarkdownListItem = ({ node }: Props) => {
    return (
        <li
            className={css`
                font-size: 16px;
                color: ${color['grey-5']};
            `}
        >
            {node.children.map((child, i) => {
                return child.type === 'paragraph' ? (
                    <>
                        {child.children.map((child, j) => (
                            <AppMarkdown key={`${i}${j}`} node={child} />
                        ))}
                    </>
                ) : (
                    <AppMarkdown key={i} node={child} />
                )
            })}
        </li>
    )
}
