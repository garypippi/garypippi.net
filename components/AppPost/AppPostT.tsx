import { Component } from './types'

export const AppPostT: Component = ({ token: { content } }) => {
    return (
        <>{content}</>
    )
}
