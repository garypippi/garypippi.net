import { PropsWithChildren } from 'react'
import 'tailwindcss/tailwind.css'

export const App = (props: PropsWithChildren<any>) => {
    return (
        <div className="container mx-auto">
            {props.children}
        </div>
    )
}
