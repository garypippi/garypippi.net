import { PropsWithChildren } from 'react'

interface ClassMap {
    md: string
    lg: string
}

const classes: ClassMap = {
    md: '2xl:px-96 xl:px-64 lg:px-48 md:px-16 px-4',
    lg: '2xl:px-64 xl:px-48 lg:px-16 md:px-8 px-4'
}

interface Props {
    size: keyof ClassMap
}

export const AppPage = ({ size, children }: PropsWithChildren<Props>) => {
    return (
        <div className={classes[size]}>
            {children}
        </div>
    )
}
