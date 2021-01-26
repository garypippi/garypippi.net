import renderer from 'react-test-renderer'
import { AppPage } from '../../components/AppPage'

describe('AppPage.tsx', () => {
    it('should render md', () => {
        expect(renderer.create(<AppPage size="md">hoge</AppPage>)).toMatchSnapshot()
    })
    it('should render lg', () => {
        expect(renderer.create(<AppPage size="lg">hoge</AppPage>)).toMatchSnapshot()
    })
})
