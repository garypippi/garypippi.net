import { FunctionComponent, PropsWithChildren, createElement } from 'react'
import { Token } from '../modules/md/lexer/token'
import hljs from 'highlight.js'

interface Props {
    token: Token
}

const AppPostInlineFragmentText = ({ token }: PropsWithChildren<Props>) => {
    return (
        <>{token.content}</>
    )
}

const AppPostInlineFragmentImage = ({ token: { matches: [, path] } }: PropsWithChildren<Props>) => {
    return (
        <img src={`https://s3-ap-northeast-1.amazonaws.com/garypippi.net/${path}`} />
    )
}

const AppPostInlineFragmentVideo = ({ token: { matches: [, path] } }: PropsWithChildren<Props>) => {
    return (
        <video src={`https://s3-ap-northeast-1.amazonaws.com/garypippi.net/${path}`} controls />
    )
}

const AppPostInlineLink = ({ token: { matches: [text, href] } }: PropsWithChildren<Props>) => {
    return (
        <a href={href} className="text-red-600">{text}</a>
    )
}

const inlineComponents: {[K:string]: FunctionComponent<Props>} = {
    t: AppPostInlineFragmentText,
    a: AppPostInlineLink,
    img: AppPostInlineFragmentImage,
    video: AppPostInlineFragmentVideo
}

const AppPostParagraph = ({ token }: PropsWithChildren<Props>) => {
    return (
        <p className='my-3 text-sm md:text-base'>
            {token.tokens.map((token, key) => {
                const InlineFragment = inlineComponents[token.type]
                if (InlineFragment) {
                    return <InlineFragment key={key} token={token} />
                }
                return null
            })}
        </p>
    )
}

const classes: {[K:string]: string} = {
    '#': '',
    '##': 'my-6 text-xl md:text-2xl pb-1 border-b',
    '###': 'my-3 text-lg md:text-xl'
}

const AppPostHeading = ({ token: { matches: [level, content] } }: PropsWithChildren<Props>) => {
    return createElement(
        `h${level.length}`,
        { className: classes[level] },
        content
    )
}


const AppPostFence = ({ token: { matches: [lang, text] } }: PropsWithChildren<Props>) => {
    return (
        <pre className="hljs my-3 text-sm md:text-base">
            <code dangerouslySetInnerHTML={{__html:hljs.highlight(lang || 'bash', text).value}} />
        </pre>
    )
}



const blockComponents: {[K:string]: FunctionComponent<Props>} = {
    p: AppPostParagraph,
    h: AppPostHeading,
    fence: AppPostFence
    // h: AppPostDefault,
    // code: AppPostDefault,
    // a: AppPostDefault,
    // img: AppPostDefault,
    // nl: AppPostDefault
}

export const AppPost = ({ token }: PropsWithChildren<Props>) => {
    const Fragment = blockComponents[token.type]
    if (Fragment) {
        return <Fragment token={token} />
    }
    return null
}
