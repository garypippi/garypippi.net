import { Component } from './types'

const baseUrl = process.env.NEXT_PUBLIC_S3_PATH || ''

export const AppPostVideo: Component = ({ token: { matches: [, url] } }) => {
    return (
        <video src={`${baseUrl}${url}`} controls></video>
    )
}
