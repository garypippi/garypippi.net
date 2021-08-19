import { FunctionComponent, PropsWithChildren } from 'react'
import { Token } from '../modules/md/lexer/token'

interface Props {
    token: Token
}

const AppPostInlineFragmentText = ({ token }: PropsWithChildren<Props>) => {
    return (
        <>{token.content}</>
    )
}

const AppPostInlineFragmentImage = ({ token }: PropsWithChildren<Props>) => {
    return (
        <img src={`https://s3-ap-northeast-1.amazonaws.com/garypippi.net/${token.matches[1]}`} alt={token.matches[0]} />
    )
}

const inlineComponents: {[K:string]: FunctionComponent<Props>} = {
    t: AppPostInlineFragmentText,
    img: AppPostInlineFragmentImage
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


const blockComponents: {[K:string]: FunctionComponent<Props>} = {
    p: AppPostParagraph
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
