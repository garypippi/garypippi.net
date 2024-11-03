import { Video } from '../../modules/markdown/types'
import { css } from 'goober'
import { VIDEO_PATH } from '../../modules/env'

interface Props {
    node: Video
}

export const AppMarkdownVideo = ({ node: { url } }: Props) => {
    return (
        <video
            src={`${VIDEO_PATH}${url}`}
            controls
            className={css`
                max-width: 100%;
                margin: 10px 0;
            `}
        />
    )
}
