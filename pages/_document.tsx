import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '../components/GoogleAnalytics'

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID

export default class AppDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <GoogleAnalytics id={GOOGLE_ANALYTICS_ID} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
