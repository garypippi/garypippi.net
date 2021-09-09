import { Component } from './types'

export const AppPostLink: Component = ({ token: { matches: [text, href] } }) => {
    return (
        <a className="text-red-600" href={href}>
            {text}
        </a>
    )
}
