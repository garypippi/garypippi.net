import { Image as MdastImage } from 'mdast'
import { VIDEO_PATH } from '@lib/environments'
import styles from './styles.module.css'

type Props = {
    node: MdastImage
}

export const Video = ({ node: { url } }: Props) => {
    return (
        <video src={`${VIDEO_PATH}${url}`} controls className={styles.video} />
    )
}
