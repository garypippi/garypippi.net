import { Key } from 'react'
import { Token } from '../../modules/md/lexer/token'
import { ComponentMap, Component } from './types'


const tap = (value: Component|undefined, callback: (Component: Component) => ReturnType<Component>) => {
    return value ? callback(value) : null
}

export const render = (token: Token, key: Key, components: ComponentMap) => {
    return tap(components[token.type], Component => {
        return (
            <Component
                key={key}
                token={token}
            />
        )
    })
}
