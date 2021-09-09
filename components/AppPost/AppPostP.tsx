import { Component } from './types'
import { render } from './render'
import { AppPostT } from './AppPostT'
import { AppPostImage } from './AppPostImage'
import { AppPostVideo } from './AppPostVideo'
import { AppPostCode } from './AppPostCode'
import { AppPostLink } from './AppPostLink'

export const AppPostP: Component = ({ token: { tokens } }) => {
    return (
        <p className="my-3 text-sm md:text-base">
            {tokens.map((token, key) => {
                return render(token, key, {
                    t: AppPostT,
                    img: AppPostImage,
                    video: AppPostVideo,
                    code: AppPostCode,
                    a: AppPostLink
                })
            })}
        </p>
    )
}
