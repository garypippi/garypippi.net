import { Component } from './types'
// import { render } from './render'
// import { AppPostT } from './AppPostT'
//
const baseUrl = process.env.NEXT_PUBLIC_S3_PATH || ''

export const AppPostImage: Component = ({ token: { matches: [alt, url] } }) => {
    return (
        <img
            src={`${baseUrl}${url}`}
            alt={alt}
            className="my-3"
        />
    )
}
