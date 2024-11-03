import { Image } from 'mdast'
import { css } from 'goober'
import { IMAGE_PATH } from '../../modules/env'

interface Props {
    node: Image
}

export const AppMarkdownImage = ({ node: { url, alt } }: Props) => {
    return (
        <img
            src={`${IMAGE_PATH}${url}`}
            alt={alt ?? ''}
            className={css`
                max-width: 100%;
                margin: 10px 0;
            `}
        />
    )
}
