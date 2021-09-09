import { Component } from './types'

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
