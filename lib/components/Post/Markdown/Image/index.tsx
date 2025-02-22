import { Image as MdastImage } from 'mdast'
import styles from './styles.module.css'
import { IMAGE_PATH } from '@lib/environments'

type Props = {
    node: MdastImage
}

export const Image = ({ node: { url, alt } }: Props) => {
    return (
        <img
            className={styles.img}
            src={`${IMAGE_PATH}${url}`}
            alt={alt ?? ''}
        />
    )
}
