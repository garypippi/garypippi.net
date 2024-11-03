import { Root, Content } from 'mdast'
import { Video } from '../../modules/markdown/types'
import { AppMarkdownRoot } from '../AppMarkdownRoot'
import { AppMarkdownParagraph } from '../AppMarkdownParagraph'
import { AppMarkdownText } from '../AppMarkdownText'
import { AppMarkdownList } from '../AppMarkdownList'
import { AppMarkdownListItem } from '../AppMarkdownListItem'
import { AppMarkdownImage } from '../AppMarkdownImage'
import { AppMarkdownHeading } from '../AppMarkdownHeading'
import { AppMarkdownCode } from '../AppMarkdownCode'
import { AppMarkdownLink } from '../AppMarkdownLink'
import { AppMarkdownInlineCode } from '../AppMarkdownInlineCode'
import { AppMarkdownVideo } from '../AppMarkdownVideo'
import { AppMarkdownBlockquote } from '../AppMarkdownBlockquote'

interface Props {
    node: Root | Content | Video
}

export const AppMarkdown = ({ node }: Props) => {
    if (node.type === 'root') return <AppMarkdownRoot node={node} />
    if (node.type === 'paragraph') return <AppMarkdownParagraph node={node} />
    if (node.type === 'text') return <AppMarkdownText node={node} />
    if (node.type === 'list') return <AppMarkdownList node={node} />
    if (node.type === 'listItem') return <AppMarkdownListItem node={node} />
    if (node.type === 'image') return <AppMarkdownImage node={node} />
    if (node.type === 'heading') return <AppMarkdownHeading node={node} />
    if (node.type === 'code') return <AppMarkdownCode node={node} />
    if (node.type === 'link') return <AppMarkdownLink node={node} />
    if (node.type === 'inlineCode') return <AppMarkdownInlineCode node={node} />
    if (node.type === 'video') return <AppMarkdownVideo node={node} />
    if (node.type === 'blockquote') return <AppMarkdownBlockquote node={node} />
    throw new Error(`Not something we can render: ${node.type}`)
}
