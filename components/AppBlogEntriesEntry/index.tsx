import Link from 'next/link'
import { css } from 'goober'
import { color } from '../../modules/css'
import { Entry } from '../../modules/markdown/types'
import { format } from 'date-fns'

interface Props {
    entry: Omit<Entry, 'body'>
    className?: string
}

export const AppBlogEntriesEntry = ({
    className = '',
    entry: { href, attr },
}: Props) => {
    return (
        <div
            className={
                className +
                ' ' +
                css`
                    display: inline-block;
                    padding: 10px;
                `
            }
        >
            <Link
                href={href}
                className={css`
                    text-decoration: none;
                `}
            >
                <h3
                    className={css`
                        font-weight: normal;
                        font-size: 18px;
                        margin-bottom: 4px;
                        color: ${color['grey-5']};
                    `}
                >
                    {attr.title}
                </h3>
            </Link>
            <span
                className={css`
                    font-size: 16px;
                    color: ${color['grey-1']};
                `}
            >
                {format(new Date(attr.date), 'yyyy/MM/dd HH:mm')}
            </span>
            {attr.tags.map((tag, i) => (
                <Link
                    key={i}
                    href={`/tags/${tag}`}
                    className={css`
                        font-size: 16px;
                        margin-left: 4px;
                        color: ${color['grey-1']};
                    `}
                >
                    {`#${tag}`}
                </Link>
            ))}
        </div>
    )
}
