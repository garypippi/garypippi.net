import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../modules/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useGtag } from '../components/GoogleAnalytics'

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter()
    const cbfunc = useGtag(router)
    if (cbfunc) {
        useEffect(cbfunc)
    }
    return (
        <Provider store={useStore(pageProps.initialState)}>
            <Component {...pageProps}/>
        </Provider>
    )
}

export default App
