import { Video as MdastVideo } from '@lib/getMdast'
import { VIDEO_PATH } from '@lib/environments'
import styles from './styles.module.css'

type Props = {
    node: MdastVideo
}

export const Video = ({ node: { url } }: Props) => {
    return (
        <video src={`${VIDEO_PATH}${url}`} controls className={styles.video} />
    )
}
