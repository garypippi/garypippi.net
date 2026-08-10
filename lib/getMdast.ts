import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table'
import { Node } from 'unist'
import { Paragraph, Text, Link, Root, Resource, Alternative } from 'mdast'

export interface Video extends Node, Resource, Alternative {
    type: 'video'
}

declare module 'mdast' {
    interface PhrasingContentMap {
        video: Video
    }
}

const isRoot = (node: Node): node is Root => {
    return node.type === 'root'
}

const isParagraph = (node: Node): node is Paragraph => {
    return node.type === 'paragraph'
}

const isText = (node: Node): node is Text => {
    return node.type === 'text'
}

const isLink = (node: Node): node is Link => {
    return node.type === 'link'
}

/**
 * Turn `foo?[bar](bar.mp4)` into a video node
 */
const videoPlugin = (root: Root) => {
    if (isRoot(root)) {
        root.children.forEach(node => {
            if (isParagraph(node)) {
                node.children.forEach((child, i) => {
                    if (
                        isText(child) &&
                        child.value.slice(-1) === '?' &&
                        node.children[i + 1] &&
                        isLink(node.children[i + 1])
                    ) {
                        child.value = child.value.slice(
                            0,
                            child.value.length - 1,
                        )
                        node.children[i + 1].type = 'video'
                    }
                })
            }
        })
    }
    return root
}

/**
 * Get Mdast object from Markdown body
 */
export const getMdast = (body: string) => {
    return videoPlugin(
        fromMarkdown(body, {
            extensions: [gfmTable()],
            mdastExtensions: [gfmTableFromMarkdown()],
        }),
    )
}
