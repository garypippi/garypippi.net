import { PropsWithChildren } from 'react'

export const App = (props: PropsWithChildren<{}>) => {
    return (
        <div className="container mx-auto">
            {props.children}
        </div>
    )
}
