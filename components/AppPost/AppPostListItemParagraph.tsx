import { Component } from './types'
import { render } from './render'
import { AppPostT } from './AppPostT'
import { AppPostImage } from './AppPostImage'

export const AppPostListItemParagraph: Component = ({ token: { tokens } }) => {
    return (
        <p>
            {tokens.map((token, key) => {
                return render(token, key, {
                    t: AppPostT,
                    img: AppPostImage
                })
            })}
        </p>
    )
}
