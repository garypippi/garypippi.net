import { PropsWithChildren } from 'react'

export const App = ({ children }: PropsWithChildren<{}>) => {
    return (
        <div className="container mx-auto">
            {children}
        </div>
    )
}
