import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
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
        <Component {...pageProps}/>
    )
}

export default App
