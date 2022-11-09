import { Video } from '../../modules/markdown/types'
import { css } from 'goober'

interface Props {
    node: Video
}

const host = process.env.NEXT_PUBLIC_S3_HOST;
const path = process.env.NEXT_PUBLIC_S3_PATH;

const createSrc = (url: string) => {
    return `http://${host}${path}${url}`
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
