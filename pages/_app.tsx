import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../modules/store'
import { useGtag, GtagFn } from '../components/GoogleAnalytics'

declare var gtag: GtagFn|undefined

const App = ({ Component, pageProps }: AppProps<any>) => {
    useGtag(typeof gtag == 'function' && gtag)
    return (
        <Provider store={useStore(pageProps.initialState)}>
            <Component {...pageProps}/>
        </Provider>
    )
}

export default App
