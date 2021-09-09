import Link from 'next/link'
import Head from 'next/head'
import { PropsWithChildren } from 'react'

interface Props {
    title?: string
}

export const AppHeader = ({ title, children }: PropsWithChildren<Props>) => {
    return (
        <div className="py-8 lg:py-8 mx-4 lg:mx-16 my-4 lg:my-8 flex flex-row justify-center items-stretch text-gray-900 border-b">
            <Head>
                <title>{title}</title>
            </Head>
            <h1 className="text-gray-500">
                <Link href="/">
                    <a>{children}</a>
                </Link>
            </h1>
        </div>
    )
}
