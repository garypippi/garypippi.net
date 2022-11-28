import { Image } from 'mdast'
import { css } from 'goober'
import { getEnv } from '../../modules/env'

interface Props {
    node: Image
}

const { s3 } = getEnv()

const createSrc = (url: string) => {
    return `https://${s3.host}${s3.path}768x/${url}`
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
