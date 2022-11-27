import { PropsWithChildren } from 'react'
import { css } from 'goober'

interface Props {
    className?: string
}

export const App = ({ className = '', children }: PropsWithChildren<Props>) => {
    return (
        <div className={className + ' ' + css`
            padding: 40px 0;
        `}>
            {children}
        </div>
    )
}
