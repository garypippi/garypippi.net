import { Root, RootContent } from 'mdast'
import * as M from './Markdown'

type Props = {
    node: Root | RootContent
}

const isVideoUrl = (url: string) => /\.(mp4|webm|mov)$/i.test(url)

/**
 * Dispatch an mdast node to its component.
 *
 * Unsupported node types throw at build time rather than being dropped, so an
 * article using one fails the build instead of silently losing content.
 * Notably `strong` (**bold**) and `emphasis` (*italic*) are not handled yet.
 *
 * `tableRow` and `tableCell` are absent on purpose: `<th>` vs `<td>` and the
 * column alignment need the row context, so `Table` renders them directly.
 *
 * `image` splits on the file extension: `![clip](clip.mp4)` renders a
 * `<video>`, everything else an `<img>`.
 */
export const Post = ({ node }: Props) => {
    switch (node.type) {
        case 'root':
            return <M.Root node={node} />
        case 'paragraph':
            return <M.Paragraph node={node} />
        case 'text':
            return <M.Text node={node} />
        case 'list':
            return <M.List node={node} />
        case 'listItem':
            return <M.ListItem node={node} />
        case 'image':
            return isVideoUrl(node.url) ? (
                <M.Video node={node} />
            ) : (
                <M.Image node={node} />
            )
        case 'heading':
            return <M.Heading node={node} />
        case 'code':
            return <M.Code node={node} />
        case 'link':
            return <M.Link node={node} />
        case 'inlineCode':
            return <M.InlineCode node={node} />
        case 'blockquote':
            return <M.Blockquote node={node} />
        case 'table':
            return <M.Table node={node} />
        default:
            throw new Error(`Not something we can render: ${node.type}`)
    }
}
