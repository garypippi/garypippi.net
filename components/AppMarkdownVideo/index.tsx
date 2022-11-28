import { Video } from '../../modules/markdown/types'
import { css } from 'goober'
import { getEnv } from '../../modules/env'

interface Props {
    node: Video
}

const { s3 } = getEnv()

const createSrc = (url: string) => {
    return `http://${s3.host}${s3.path}${url}`
}

export const AppMarkdownVideo = ({ node }: Props) => {
    return (
        <video
            src={createSrc(node.url)}
            controls
            className={css`
                max-width: 100%;
                margin: 10px 0;
        `}/>
    )
}
