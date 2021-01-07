import { ShowdownExtension } from 'showdown'

export default (path: string): ShowdownExtension => ({
    type: 'lang',
    regex: /(?<!`)!\[(.*)\]\((.*)\)/.source,
    replace: `<img src="${path}$2" alt="$1">`
})
