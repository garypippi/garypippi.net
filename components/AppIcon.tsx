import { PropsWithChildren } from 'react'

interface Props {
    size?: number
    className?: string
}

export const AppIcon = (props: PropsWithChildren<Props>) => {
    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 24 24"
            className={`inline ${props.className || ''}`}
        >
            <path d={props.children?.toString()} className="fill-current"></path>
        </svg>
    )
}
