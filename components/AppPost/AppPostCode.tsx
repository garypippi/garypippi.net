import { Component } from './types'

export const AppPostCode: Component = ({ token: { matches: [code] } }) => {
    return (
        <code className="bg-gray-100 px-2 py-px mx-px">{code}</code>
    )
}
