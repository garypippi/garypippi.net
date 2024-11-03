import { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { NextPage } from 'next'
import { extractCss } from 'goober'

interface Props {
    css: string
}

const Document: NextPage<Props> = ({ css }: Props) => {
    return (
        <Html>
            <Head>
                <style
                    id="_goobar"
                    dangerouslySetInnerHTML={{
                        __html: css,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

Document.getInitialProps = async (context: DocumentContext) => {
    return {
        ...(await context.renderPage()),
        css: extractCss(),
    }
}

export default Document
