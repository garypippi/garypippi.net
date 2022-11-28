import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { css } from 'goober'
import { color, lg, mergeClass } from '../../modules/css'
import { getEnv } from '../../modules/env'

const { github, twitter } = getEnv()

interface Props {
    className?: string
}

export const App = ({ className, children }: PropsWithChildren<Props>) => {
    return (
        <div className={mergeClass(className, css`
            padding: 40px 0;
        `)}>
            {children}
            <div className={css`
                margin: 80px auto 0;
                padding-top: 10px;
                max-width: ${lg}px;
                border-top: 1px solid ${color['grey-3']};
            `}>
                <Link
                    href="/"
                    className={css`
                        font-size: 16px;
                        color: ${color['grey-1']};
                `}>
                    {'garypippi.net'}
                </Link>
                <span className={css`
                    margin-left: 10px;
                `}>
                    {'|'}
                </span>
                <a
                    href={github}
                    className={css`
                        font-size: 16px;
                        margin-left: 10px;
                        color: ${color['grey-1']};
                `}>
                    {'Github'}
                </a>
                <a
                    href={twitter}
                    className={css`
                        font-size: 16px;
                        margin-left: 10px;
                        color: ${color['grey-1']};
                `}>
                    {'Twitter'}
                </a>
            </div>
        </div>
    )
}
