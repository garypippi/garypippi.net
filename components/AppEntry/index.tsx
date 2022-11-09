import Link from 'next/link'
import { Entry } from '../../modules/markdown/types'
import { css } from 'goober'
import { theme } from '../../modules/csstheme'
import { format } from 'date-fns'

interface Props {
    entry: Entry
}

export const AppEntry = ({ entry: { href, attr } }: Props) => {
    return (
        <Link
            href={href}
            className={css`
                display: block;
                text-decoration: none;
                &:not(:last-child) {
                    margin-bottom: 16px;
                }
        `}>
            <h3 className={css`
                font-size: 20px;
                font-weight: normal;
                margin-bottom: 8px;
                color: ${theme.color.text};
            `}>
                {attr.title}
            </h3>
            <span className={css`
                font-size: 16px;
                color: ${theme.color.text};
            `}>
                {format(new Date(attr.date), 'yyyy/MM/dd HH:mm')}
            </span>
            {attr.tags.map((tag, i) => (
                <span
                    key={i}
                    className={css`
                    font-size: 14px;
                    padding: 2px 4px;
                    margin-left: 4px;
                    color: ${theme.color.text};
                    background-color: ${theme.color.tag};
                `}>
                    {tag}
                </span>
            ))}
        </Link>
    )
}
