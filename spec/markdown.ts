import { unified, Plugin } from 'unified'
import { Node } from 'unist'
import { Paragraph, Text, Link, Root } from 'mdast'
import remarkParse from 'remark-parse'
import { inspect } from 'unist-util-inspect'
import { visit, Visitor } from 'unist-util-visit'
import { readFileSync } from 'fs'
import { join } from 'path'

// const print: Plugin = () =>
//     tree => console.log(inspect(tree))
const bf = readFileSync(
    join(
        process.cwd(),
        'blog/20180418075900/623edf37761ce072a5f41a09deb2f8cb.md',
    ),
)

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

const reducer = (a: number[], n: Node, i: number, o: Node[]): number[] => {
    return isText(n) &&
        n.value.slice(0, -1) === '?' &&
        o[i + 1] &&
        isLink(o[i + 1])
        ? a.concat(i)
        : a
}

const getPositions = (node: Node): number[] => {
    return (isParagraph(node) && node.children.reduce(reducer, [])) || []
}

const isVideo = (node: Node): boolean => {
    return (
        isParagraph(node) &&
        node.children.some((n, i) => {
            return (
                isText(n) &&
                n.value.slice(0, -1) === '?' &&
                node.children[i + 1] &&
                isLink(node.children[i + 1])
            )
        })
    )
}

const visitor: Visitor = (node, parent, index) => {}

const video: Plugin = () => {
    return root => {
        if (isRoot(root)) {
            console.log('entering root')
            root.children.forEach(node => {
                if (isParagraph(node)) {
                    console.log('entering paragraph')
                    node.children.forEach((child, i) => {
                        if (
                            isText(child) &&
                            child.value.slice(-1) === '?' &&
                            node.children[i + 1] &&
                            isLink(node.children[i + 1])
                        ) {
                            console.log('entering modification')
                            child.value = child.value.slice(
                                0,
                                child.value.length - 1,
                            )
                            node.children[i + 1].type = 'video' as any
                        }
                    })
                }
            })
        }
    }
}

describe('', () => {
    it('', async () => {
        console.log(
            inspect(
                await unified()
                    .use(video)
                    .run(unified().use(remarkParse).parse(bf)),
                // unified()
                //     .use(remarkParse)
                //     .use(video)
                //     .run
                //     .parse('This is paragraph containing video. ?[](hello.mp4)')
                // .parse(bf.toString())
            ),
        )
    })
})
// unified()
//     .use(remarkParse)
//     .parse()
//     .process('# Hello', (_, vf) => {
//         console.log(vf && vf.toString())
//     })
