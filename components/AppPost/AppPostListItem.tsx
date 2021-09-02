import { Component } from './types'
import { render } from './render'
import { AppPostListItemParagraph } from './AppPostListItemParagraph'
import { AppPostList } from './AppPostList'

export const AppPostListItem: Component = ({ token: { tokens } }) => {
    return (
        <li>
            {tokens.map((token, key) => {
                return render(token, key, {
                    ul: AppPostList,
                    p: AppPostListItemParagraph
                })
            })}
        </li>
    )
}
