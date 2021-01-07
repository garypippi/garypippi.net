import { ShowdownExtension } from 'showdown'
import hljs from 'highlight.js'

export default (): ShowdownExtension => ({
    type: 'lang',
    regex: /`{3}.+\n[^]+?\n`{3}/.source,
    replace: (str: string) => {
        const [, lang, raw] = /^`{3}(.+)\n([^]+)\n`{3}$/.exec(str) || []
        const { value } = hljs.highlight(lang, raw)
        return `<pre><code>${value}</code></pre>`
    }
})
