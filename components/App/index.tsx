import { PropsWithChildren } from 'react'
import Link from 'next/link'
import { css } from 'goober'
import { theme } from '../../modules/csstheme'

export const App = ({ children }: PropsWithChildren<{}>) => {
    return (
        <>
            <div className={css`
                padding: 40px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            `}>
                <Link
                    href="/"
                    className={css`
                        color: ${theme.color.title};
                `}>
                    {'garypippi.net'}
                </Link>
            </div>
            <div className={css`
                max-width: ${theme.breakpoint}px;
                margin: 0 auto;
                padding-bottom: 40px;
                @media screen and (max-width: ${theme.breakpoint}px) {
                    max-width: 100%;
                    padding-left: 10px;
                    padding-right: 10px;
                }
            `}>
                {children}
            </div>
        </>
    )
}
