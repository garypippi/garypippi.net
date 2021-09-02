import { Component } from './types'
import { render } from './render'
import { AppPostT } from './AppPostT'
import { AppPostImage } from './AppPostImage'

export const AppPostP: Component = ({ token: { tokens } }) => {
    return (
        <p className="my-3 text-sm md:text-base">
            {tokens.map((token, key) => {
                return render(token, key, {
                    t: AppPostT,
                    img: AppPostImage
                })
            })}
        </p>
    )
}
