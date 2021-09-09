import { Component } from './types'
import { render } from './render'
import { AppPostP } from './AppPostP'
import { AppPostList } from './AppPostList'
import { AppPostFence } from './AppPostFence'
import { AppPostHeading } from './AppPostHeading'

export const AppPostRoot: Component = ({ token: { tokens } }) => {
    return (
        <>
            {tokens.map((token, key) => {
                return render(token, key, {
                    p: AppPostP,
                    ul: AppPostList,
                    fence: AppPostFence,
                    h: AppPostHeading
                })
            })}
        </>
    )
}
