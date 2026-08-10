import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table'

/**
 * Get Mdast object from Markdown body
 */
export const getMdast = (body: string) => {
    return fromMarkdown(body, {
        extensions: [gfmTable()],
        mdastExtensions: [gfmTableFromMarkdown()],
    })
}
