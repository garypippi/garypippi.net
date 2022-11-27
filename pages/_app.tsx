import { createElement } from 'react'
import { AppProps } from 'next/app'
import { setup } from 'goober'
import { prefix } from 'goober/prefixer'
import { createGlobalStyles } from 'goober/global'

setup(createElement, prefix)

const GlobalStyles = createGlobalStyles`
    * { margin: 0; padding: 0; box-sizing: border-box; }
`

const App = ({ Component, pageProps }: AppProps<any>) => {
    return (
        <>
            <GlobalStyles />
            <Component {...pageProps}/>
        </>
    )
}

export default App
