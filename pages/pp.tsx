import { GetStaticProps } from 'next'
import { App } from '../components/App'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { AppPage } from '../components/AppPage'
import { getStaticPropsWithInitialState } from '../modules/ss'

const PpPage = () => {
    return (
        <App>
            <AppHeader title="プライバシーポリシー">garypippi.net</AppHeader>
            <AppPage size="md">
                <h1 className="text-lg">プライバシーポリシー</h1>
                <div className="text-sm text-gray-800">
                    <ul className="ml-4 my-2 list-disc">
                        <li>当サイトは Google アナリティクス を使用しています。</li>
                        <li>Google アナリティクス はアクセス解析のため Cookie を使用します。</li>
                        <li>Cookie による情報収集は個人を特定するものではありません。</li>
                        <li>Cookie はお使いのブラウザー設定で無効にすることが可能です。</li>
                    </ul>
                </div>
            </AppPage>
            <AppFooter />
        </App>
    )
}

export default PpPage

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: getStaticPropsWithInitialState({})
    }
}
