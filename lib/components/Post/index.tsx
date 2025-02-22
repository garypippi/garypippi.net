import { Root, Content } from 'mdast'
import { Video } from '@lib/getMdast'
import * as M from './Markdown'

type Props = {
    node: Root | Content | Video
}

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
            return <M.Image node={node} />
        case 'heading':
            return <M.Heading node={node} />
        case 'code':
            return <M.Code node={node} />
        case 'link':
            return <M.Link node={node} />
        case 'inlineCode':
            return <M.InlineCode node={node} />
        case 'video':
            return <M.Video node={node} />
        case 'blockquote':
            return <M.Blockquote node={node} />
        default:
            throw new Error(`Not something we can render: ${node.type}`)
    }
}
