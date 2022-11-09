import { Image } from 'mdast'
import { css } from 'goober'

interface Props {
    node: Image
}

const host = process.env.NEXT_PUBLIC_S3_HOST
const path = process.env.NEXT_PUBLIC_S3_PATH

const createSrc = (url: string) => {
    return `https://${host}${path}${url}`
}

export const AppMarkdownImage = ({ node }: Props) => {
    return (
        <img
            src={createSrc(node.url)}
            alt={node.alt || ''}
            className={css`
                max-width: 100%;
                margin: 10px 0;
        `}/>
    )
}
