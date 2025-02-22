import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { Plugin } from 'unified'
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

const videoPlugin: Plugin<unknown[], Root, Root> = () => {
    return root => {
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
    }
}

/**
 * Get Mdast object from Markdown body
 */
export const getMdast = (body: string) => {
    return unified()
        .use(videoPlugin)
        .run(unified().use(remarkParse).parse(body))
}
