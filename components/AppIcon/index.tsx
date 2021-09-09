import { PropsWithChildren } from 'react'

interface Props {
    size?: number
    className?: string
}

export const AppIcon = ({ size, className, children }: PropsWithChildren<Props>) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`inline ${className || ''}`}
        >
            <path d={(children || '').toString()} className="fill-current"></path>
        </svg>
    )
}
