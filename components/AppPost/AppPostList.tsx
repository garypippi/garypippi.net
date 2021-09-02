import { Component } from './types'
import { render } from './render'
import { AppPostListItem } from './AppPostListItem'

export const AppPostList: Component = ({ token: { tokens } }) => {
    return (
        <ul className="my-3 ml-6 text-sm list-disc">
            {tokens.map((token, key) => {
                return render(token, key, {
                    li: AppPostListItem
                })
            })}
        </ul>
    )
}
