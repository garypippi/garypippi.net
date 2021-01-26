import { PropsWithChildren } from 'react'

const classes = {
    md: '2xl:px-96 xl:px-64 lg:px-48 md:px-16 px-4',
    lg: '2xl:px-64 xl:px-48 lg:px-16 md:px-8 px-4'
}

interface Props {
    size: keyof (typeof classes)
}

export const AppPage = (props: PropsWithChildren<Props>) => {
    return (
        <div className={classes[props.size]}>
            {props.children}
        </div>
    )
}
