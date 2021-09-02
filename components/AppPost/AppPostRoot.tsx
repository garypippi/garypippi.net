import { Component } from './types'
import { render } from './render'
import { AppPostP } from './AppPostP'
import { AppPostList } from './AppPostList'

export const AppPostRoot: Component = ({ token: { tokens } }) => {
    return (
        <>
            {tokens.map((token, key) => {
                return render(token, key, {
                    p: AppPostP,
                    ul: AppPostList
                })
            })}
        </>
    )
}
