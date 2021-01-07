import { ShowdownExtension } from 'showdown'

export default (path: string): ShowdownExtension => ({
    type: 'lang',
    regex: /(?<!`)\?\[(.*)\]\((.*)\)/.source,
    replace: `<p><video src="${path}$2" controls>$1</video></p>`
})
