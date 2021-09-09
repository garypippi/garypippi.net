import { FunctionComponent } from 'react'
import { Component } from './types'

const render = (Component: FunctionComponent, text: string) => {
    if (! Component) {
        return null
    }
    return (
        <Component>{text}</Component>
    )
}

const components: {[K:string]: FunctionComponent } = {
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2 className="my-6 text-xl md:text-2xl pb-1 border-b">{children}</h2>,
    h3: ({ children }) => <h3 className="my-3 text-lg md:text-xl">{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h5>{children}</h5>,
    h6: ({ children }) => <h6>{children}</h6>
}

export const AppPostHeading: Component = ({ token: { matches: [n, t] } }) => {
    return render(
        components[`h${n.length}`],
        t
    )
}
