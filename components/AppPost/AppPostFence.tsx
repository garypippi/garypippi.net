import { Component } from './types'
// import { render } from './render'
// import { AppPostT } from './AppPostT'
// import { AppPostImage } from './AppPostImage'
import { highlight } from 'highlight.js'

export const AppPostFence: Component = ({ token: { matches: [lang, code] } }) => {
    return (
        <pre
            className="hljs my-3 text-sm md:text-base"
            dangerouslySetInnerHTML={{__html: highlight(lang || 'bash', code).value}}
        />
    )
}
