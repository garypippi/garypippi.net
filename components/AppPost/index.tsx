import { Component } from './types'
import { AppPostRoot } from './AppPostRoot'

export const AppPost: Component = ({ token }) => {
    return (
        <AppPostRoot token={token} />
    )
}
