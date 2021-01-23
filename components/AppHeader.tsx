import Link from 'next/link'

export const AppHeader = () => {
    return (
        <div className="py-8 my-8 flex flex-row justify-center items-center text-gray-900">
            <Link href="/">
                <a>
                    <h1 className="text-5xl">garypippi</h1>
                </a>
            </Link>
        </div>
    )
}
